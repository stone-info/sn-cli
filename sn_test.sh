#!/usr/bin/env bash

# Because bash has been upgraded

cmd="/Users/stone/git_repository/sn-cli/bin/sn.js"

#node /Users/stone/git_repository/sn-cli/bin/sn.js --no-sauce
#node /Users/stone/git_repository/sn-cli/bin/sn.js
#node /Users/stone/git_repository/sn-cli/bin/sn.js -v hello
#node /Users/stone/git_repository/sn-cli/bin/sn.js -v hello -r -v

#node $cmd -r 1..2
#node $cmd rmdir a b c d
#node $cmd echo hello a b c
node $cmd -v ddd -r aaa
