.PHONY: help
help:
	@echo "------------------------------------------------------------------------"
	@echo "Sadaqah"
	@echo "------------------------------------------------------------------------"
	@grep -E '^[a-zA-Z0-9_/%\-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: test
test: ## Run available tests on codebase
	@echo 'Running Tests'
	npm run test

.PHONY: install
install: ## Install all needed libraries
	@echo 'Installing node modules'
	rm -rf ./node_modules
	npm install

.PHONY: build
build: ## Compile codebase to JS. Found in /dist
	@echo 'Building to /dist'
	npm run build

.PHONY: lint
lint: ## Lint codebase
	@echo 'Linting codebase'
	npm run lint

.PHONY: serve
serve: ## Start local server
	@echo 'Starting server'
	npm run start

.PHONY: build-image
build-image: ## Build docker image
	@echo '==> Building sadaqah:latest image'
	docker build -t sadaqah:latest .

.PHONY: firebase-client
firebase-client: ## StartFirebase Client
	@echo '==> Starting Firebase Client'
	serve -s build