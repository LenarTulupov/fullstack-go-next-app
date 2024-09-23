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

type ErrorSecurity struct {
	HttpStatusCode int    `json:"status"`
	Message        string `json:"message"`
}

// Реализуем интерфейс error
func (e *ErrorSecurity) Error() string {
	return e.Message
}
