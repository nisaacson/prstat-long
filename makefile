MOCHA=node_modules/.bin/mocha
REPORTER=spec
test:
	$(MOCHA) $(shell find test -name "*-test.js") --reporter $(REPORTER)
get-rss-by-pid:
	$(MOCHA) test/get-rss-by-pid-test.js --reporter $(REPORTER)
.PHONY: test