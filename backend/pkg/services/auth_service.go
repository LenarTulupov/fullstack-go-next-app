package services

import (
    "api/pkg/config"
    "github.com/golang-jwt/jwt"
    "fmt"
)

func ValidateToken(token string) (string, error) {
    claims := jwt.MapClaims{}
    parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
        return []byte(config.JwtSecretKey), nil
    })

    if err != nil || !parsedToken.Valid {
        return "", fmt.Errorf("invalid token")
    }

    role, ok := claims["role"].(string)
    if !ok {
        return "", fmt.Errorf("role not found in token claims")
    }

    return role, nil
}
