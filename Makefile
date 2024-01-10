
.PHONY: server
server:
	@cd examples/server && npm run start

.PHONY: cms
cms:
	@cd examples/cms && npm run develop --watch-admin

.PHONY: plugin
plugin:
	@cd plugin && npm run develop

.PHONY: develop
develop:
	@make plugin & make server & make cms

.PHONY: publish
publish:
	@cd plugin && npm publish