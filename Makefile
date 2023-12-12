
.PHONY: server
server:
	@cd tools/server && npm run start

.PHONY: cms
cms:
	@cd tools/cms && npm run develop

.PHONY: plugin
plugin:
	@cd plugin && npm run develop --watch-admin

.PHONY: develop
develop:
	@make plugin & make server & make cms