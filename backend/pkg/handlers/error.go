package handlers

import (
	"encoding/json"
	"net/http"
	"api/pkg/models/errors"
)

func ResponseError(err error, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	if nerr, ok := err.(*errors.ErrorDb); ok {
		w.WriteHeader(nerr.HttpStatusCode)
		json.NewEncoder(w).Encode(nerr)
	} else if nerr, ok := err.(*errors.ErrorService); ok {
		w.WriteHeader(nerr.HttpStatusCode)
		json.NewEncoder(w).Encode(nerr)
	} else if nerr, ok := err.(*errors.ErrorController); ok {
		w.WriteHeader(nerr.HttpStatusCode)
		json.NewEncoder(w).Encode(nerr)
	} else if nerr, ok := err.(*errors.ErrorSecurity); ok {
		w.WriteHeader(nerr.HttpStatusCode)
		json.NewEncoder(w).Encode(nerr)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errors.ErrorDb{
			HttpStatusCode: http.StatusBadRequest,
			Message:        "Bad Request",
		})
	}
}
