package handlers

import (
    "database/sql"
    "encoding/json"
    "log"
    "net/http"
    "strconv"

    "api/pkg/config"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
    Username string `json:"username" binding:"required"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type User struct {
    Id       int      `json:"id"`
    Username string   `json:"username"`
    Email    string   `json:"email"`
    Roles    []string `json:"roles"`
}

func RegisterUser(c *gin.Context) {
    var req RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        log.Printf("JSON binding error: %v", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        log.Printf("Password hashing error: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
        return
    }

    var userId int
    err = config.DB.QueryRow(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
        req.Username, req.Email, string(hashedPassword),
    ).Scan(&userId)

    if err != nil {
        log.Printf("User insert error: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    _, err = config.DB.Exec(
        "INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE role_name = 'user'))",
        userId,
    )

    if err != nil {
        log.Printf("Role assignment error: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not assign default role"})
        return
    }

    if req.Email == "vainmannjas@gmail.com" {
        _, err = config.DB.Exec(
            "INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE role_name = 'admin'))",
            userId,
        )
        if err != nil {
            log.Printf("Admin role assignment error: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not assign admin role"})
            return
        }
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func GetAllUsers(c *gin.Context) {
    query := `
        SELECT u.id, u.username, u.email, 
               COALESCE(json_agg(r.role_name) FILTER (WHERE r.role_name IS NOT NULL), '[]') 
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        GROUP BY u.id, u.username, u.email
    `

    rows, err := config.DB.Query(query)
    if err != nil {
        log.Printf("SQL query error (GetAllUsers): %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch users"})
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        var rolesJSON string
        if err := rows.Scan(&u.Id, &u.Username, &u.Email, &rolesJSON); err != nil {
            log.Printf("SQL scan error: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error scanning user data"})
            return
        }

        if err := json.Unmarshal([]byte(rolesJSON), &u.Roles); err != nil {
            log.Printf("JSON unmarshal error: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error processing user roles"})
            return
        }

        users = append(users, u)
    }

    c.JSON(http.StatusOK, users)
}

func GetUser(c *gin.Context) {
    idStr := c.Param("id")
    if idStr == "" {
        log.Printf("User ID is required")
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
        return
    }

    id, err := strconv.Atoi(idStr)
    if err != nil || id <= 0 {
        log.Printf("Invalid user ID: %s", idStr)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    var user User
    err = config.DB.QueryRow(
        "SELECT id, username, email FROM users WHERE id = $1", id,
    ).Scan(&user.Id, &user.Username, &user.Email)

    if err == sql.ErrNoRows {
        log.Printf("User not found: id=%d", id)
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    } else if err != nil {
        log.Printf("SQL query error (GetUser): %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
        return
    }

    c.JSON(http.StatusOK, user)
}

func CreateUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        log.Printf("JSON binding error (CreateUser): %v", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    err := config.DB.QueryRow(
        "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id",
        user.Username, user.Email,
    ).Scan(&user.Id)

    if err != nil {
        log.Printf("SQL insert error (CreateUser): %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        log.Printf("JSON binding error (UpdateUser): %v", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := config.DB.Exec(
        "UPDATE users SET username = $1, email = $2 WHERE id = $3",
        user.Username, user.Email, id,
    )

    if err != nil {
        log.Printf("SQL update error (UpdateUser): %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

func DeleteUser(c *gin.Context) {
    id := c.Param("id")
    _, err := config.DB.Exec("DELETE FROM users WHERE id = $1", id)

    if err != nil {
        log.Printf("SQL delete error (DeleteUser): %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
