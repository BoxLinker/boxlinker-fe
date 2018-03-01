all: push

IMAGE_TAG=${shell git describe --tags --long}
IMAGE_NAME=index.boxlinker.com/boxlinker/web-console:${IMAGE_TAG}

container:
	yarn build
	docker build -t ${IMAGE_NAME} .

push: container
	docker push ${IMAGE_NAME}

test: container
	docker rm -f test-boxlinker-fe || true
	docker run -it --name test-boxlinker-fe -p 8080:80 ${IMAGE_NAME}