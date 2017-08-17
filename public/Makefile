all: push

PREFIX=index.boxlinker.com/boxlinker

container:
	docker build -t $(PREFIX)/web-index:latest .

push: container
	docker push $(PREFIX)/web-index:latest

index-redirect:
	docker build -t $(PREFIX)/web-index-redirect:latest -f Dockerfile.index-redirect .
	docker push $(PREFIX)/web-index-redirect:latest
