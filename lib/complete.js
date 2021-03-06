/*  __  __    _    _  _______    ____ _   _    _    _   _  ____ _____ ____  _
   |  \/  |  / \  | |/ / ____|  / ___| | | |  / \  | \ | |/ ___| ____/ ___|| |
   | |\/| | / _ \ | ' /|  _|   | |   | |_| | / _ \ |  \| | |  _|  _| \___ \| |
   | |  | |/ ___ \| . \| |___  | |___|  _  |/ ___ \| |\  | |_| | |___ ___) |_|
   |_|  |_/_/   \_\_|\_\_____|  \____|_| |_/_/   \_\_| \_|\____|_____|____/(_)

   There is a 100% chance that this project can use improvements.
   Pull requests are ALWAYS welcome, even if just amounts to a conversation.  */

'use strict';

var exec = require('child_process').exec;
var mkdirp = require('mkdirp').sync;
var mv = require('mv');

module.exports = function (state, callback) {
    var complete = state.data.complete,
        target = state.data.name;

    if (state.target !== undefined) {
        target = state.target;
        mkdirp(target);
    }

    // Move the tmp dir and run a command if set
    mv(state.template.tmp, target, function (err) {
        if (err) {
            callback(err);
            return;
        }
        if (complete !== undefined) {
            exec(complete, function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, state);
            });
        } else {
            callback(null, state);
        }
    });
};

