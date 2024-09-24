package errors

type ErrorDb struct {
	HttpStatusCode int    `json:"status"`
	Message        string `json:"message"`
}

// Реализуем интерфейс error
func (e *ErrorDb) Error() string {
	return e.Message
}

type ErrorService struct {
	HttpStatusCode int    `json:"status"`
	Message        string `json:"message"`
}

// Реализуем интерфейс error
func (e *ErrorService) Error() string {
	return e.Message
}

type ErrorController struct {
	HttpStatusCode int    `json:"status"`
	Message        string `json:"message"`
}

// Реализуем интерфейс error
func (e *ErrorController) Error() string {
	return e.Message
}

// Конструктор для ErrorController
func NewErrorController(statusCode int, message string) *ErrorController {
	return &ErrorController{
		HttpStatusCode: statusCode,
		Message:        message,
	}
}

type ErrorSecurity struct {
	HttpStatusCode int    `json:"status"`
	Message        string `json:"message"`
}

// Реализуем интерфейс error
func (e *ErrorSecurity) Error() string {
	return e.Message
}

// Конструктор для ErrorSecurity
func NewErrorSecurity(statusCode int, message string) *ErrorSecurity {
	return &ErrorSecurity{
		HttpStatusCode: statusCode,
		Message:        message,
	}
}
