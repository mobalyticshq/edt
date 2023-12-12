
.PHONY: server
server:
	@cd examples/server && npm run start

.PHONY: cms
cms:
	@cd examples/cms && npm run develop

.PHONY: plugin
plugin:
	@cd examples && npm run develop --watch-admin

.PHONY: develop
develop:
	@make plugin & make server & make cms