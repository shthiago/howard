IMAGE = howard
VERSION = v1


####################
#     Commands     #
####################

clear-build: docker-clear image-build

docker-clear:
	@docker rm --force $(IMAGE) & docker rmi --force $(IMAGE):$(VERSION)

image-build:
	@poetry export -f requirements.txt > requirements.txt
	@docker build --no-cache -t $(IMAGE):$(VERSION) .

run-docker:
	@docker run -dt --name $(IMAGE) --network host $(IMAGE):$(VERSION)

run-local:
	@cd src && flask run


