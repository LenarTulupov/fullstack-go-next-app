package services

import (
    "api/pkg/config"
    "github.com/golang-jwt/jwt"
    "fmt"
)

func ValidateToken(tokenString string) (string, string, error) {
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return []byte(config.JwtSecretKey), nil
    })
    if err != nil {
        return "", "", err
    }

    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        role, roleOk := claims["role"].(string)
        username, nameOk := claims["username"].(string) // Здесь username вместо name

        if !roleOk || !nameOk {
            return "", "", fmt.Errorf("role or username not found in token")
        }

        return role, username, nil
    }
    return "", "", fmt.Errorf("invalid token")
}




// package services

// import (
//     "api/pkg/config"
//     "github.com/golang-jwt/jwt"
//     "fmt"
// )

// func ValidateToken(token string) (string, error) {
//     claims := jwt.MapClaims{}
//     parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
//         return []byte(config.JwtSecretKey), nil
//     })

//     if err != nil || !parsedToken.Valid {
//         return "", fmt.Errorf("invalid token")
//     }

//     role, ok := claims["role"].(string)
//     if !ok {
//         return "", fmt.Errorf("role not found in token claims")
//     }

//     return role, nil
// }
