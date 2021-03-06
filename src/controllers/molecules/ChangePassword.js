/*
Copyright 2015 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

var React = require('react');
var MatrixClientPeg = require("../../MatrixClientPeg");

module.exports = {
    propTypes: {
        onFinished: React.PropTypes.func,
    },

    Phases: {
        Edit: "edit",
        Uploading: "uploading",
        Error: "error",
        Success: "Success"
    },

    getDefaultProps: function() {
        return {
            onFinished: function() {},
        };
    },

    getInitialState: function() {
        return {
            phase: this.Phases.Edit,
            errorString: ''
        }
    },

    changePassword: function(old_password, new_password) {
        var cli = MatrixClientPeg.get();

        var authDict = {
            type: 'm.login.password',
            user: cli.credentials.userId,
            password: old_password
        };

        this.setState({
            phase: this.Phases.Uploading,
            errorString: '',
        })

        var d = cli.setPassword(authDict, new_password);

        var self = this;
        d.then(function() {
            self.setState({
                phase: self.Phases.Success,
                errorString: '',
            })
        }, function(err) {
            self.setState({
                phase: self.Phases.Error,
                errorString: err.toString()
            })
        });
    },
}
