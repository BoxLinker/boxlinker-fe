all: push

IMAGE_PREFIX=index.boxlinker.com/boxlinker
IMAGE_NAME=web-console
IMAGE_TAG=${shell git describe --tags --long}

push: container
	docker push ${IMAGE_PREFIX}/${IMAGE_NAME}:${IMAGE_TAG}

container:
	yarn run build --release
	docker build -t ${IMAGE_PREFIX}/${IMAGE_NAME}:${IMAGE_TAG} .
