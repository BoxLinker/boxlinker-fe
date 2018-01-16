all: push

IMAGE_TAG=${shell git describe --tags --long}
IMAGE_NAME=index.boxlinker.com/boxlinker/web-console:${IMAGE_TAG}

container:
	yarn build
	docker build -t ${IMAGE_NAME} .

push: container
	docker push ${IMAGE_NAME}