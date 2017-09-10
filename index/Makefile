all: push

PREFIX=index.boxlinker.com/boxlinker

container:
	docker build -t $(PREFIX)/web-index:v1 .

push: container
	docker push $(PREFIX)/web-index:v1

index-redirect:
	docker build -t $(PREFIX)/web-index-redirect:latest -f Dockerfile.index-redirect .
	docker push $(PREFIX)/web-index-redirect:latest
