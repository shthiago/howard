IMAGE = howard
VERSION = v1



####################
#     Commands     #
####################

clean-build: clean build

clean:
	@docker rm --force $(IMAGE)
	@docker rmi --force $(IMAGE):$(VERSION)

build:
	@poetry export -f requirements.txt > requirements.txt
	@docker build --no-cache -t $(IMAGE):$(VERSION) .

run-local:
	@docker run -dt --name $(IMAGE) --network host $(IMAGE):$(VERSION)

