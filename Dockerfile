FROM golang:latest

COPY . /go/src/work/

WORKDIR /go/src/work/

RUN  go get github.com/gin-gonic/gin \
      && go get github.com/jinzhu/gorm

CMD ["go", "run", "main.go"]

EXPOSE 8080