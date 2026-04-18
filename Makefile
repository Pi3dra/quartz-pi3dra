WEBPAGE_FOLDER = ~/Documents/Obsidian/quartz-pi3dra/content
OBSIDIAN_FOLDER = ~/Documents/Obsidian/Brainz/Webpage

COMMIT_MSG ?= "update site"

.PHONY: all open

all: move 
	npx quartz build && \
	git add . && \
	git commit -m $(COMMIT_MSG) && \
	git push

move:
	rm -rf $(WEBPAGE_FOLDER)/* && \
	cp -r $(OBSIDIAN_FOLDER)/* $(WEBPAGE_FOLDER)/ 

open:
	nohup npx quartz build --serve > /tmp/quartz.log 2>&1 & \
	sleep 3 && \
	firefox http://localhost:8080

