all: push

# git tag -a v0.1-dev1 -m "dev"

PREFIX=index.boxlinker.com/boxlinker
TAG=${shell git describe --tags --long}

container:
	docker build -t $(PREFIX)/web-index:$(TAG) .

push: container
	docker push $(PREFIX)/web-index:$(TAG)

index-redirect:
	docker build -t $(PREFIX)/web-index-redirect:latest -f Dockerfile.index-redirect .
	docker push $(PREFIX)/web-index-redirect:latest
