up:
	docker compose up --build
down:
	docker compose down
clean-docker:
	$(MAKE) down
	docker images -a --format "{{.ID}}" | xargs docker rmi -f 
	docker volume ls | awk '{print $2}' | xargs docker volume rm -f
attach-client:
	docker attach superauto-client-1
attach-server:
	docker attach superauto-server-1
setup-project:
	chmod +x setup.sh
	./setup.sh
	$(MAKE) up