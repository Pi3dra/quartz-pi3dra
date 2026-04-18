WEBPAGE_FOLDER = ~/Documents/Obsidian/quartz-pi3dra/content
OBSIDIAN_FOLDER = ~/Documents/Obsidian/Brainz/Webpage

COMMIT_MSG ?= "update site"

.PHONY: all

all:
	rm -rf $(WEBPAGE_FOLDER)/* && \
	cp -r $(OBSIDIAN_FOLDER)/* $(WEBPAGE_FOLDER)/ && \
	npx quartz build && \
	git add . && \
	git commit -m $(COMMIT_MSG) && \
	git push
