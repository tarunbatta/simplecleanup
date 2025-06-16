(function () {
    'use strict';
    
    $(document).ready(function(){
        var startTime = (new Date("01 January, 1970")).getTime();
        var badgeCounter = 0;
        var originTypes = null;
        var dataTypeSet = null;

        init();

        function init() {
            if ($("#lblMessage").text().length == 0) {
                $("#dvAlert").hide();
            }
            
            $("input:checkbox").prop('checked', false);

            badgeCounter = 0;

            chrome.browsingData.settings(function (response) {
                originTypes = response.options.originTypes;
                dataTypeSet = response.dataRemovalPermitted; //response.dataToRemove
            });

            GetBrowsingHistory();
            GetCookie();
            GetDownloadHistory();
        }

        function CleanByType() {
            if (dataTypeSet.hasOwnProperty("cacheStorage")) {
                delete dataTypeSet.cacheStorage;
            }

            chrome.browsingData.remove({
                "since": startTime,
                "originTypes": originTypes
            }, 
            dataTypeSet,
            function (response) {
                $("#dvAlert").show();
                $("#lblMessage").text("Cleanup successful!!");
            });
        }

        function CleanCookie() {
            chrome.cookies.getAll({

            }, 
            function(response) {
                for (var i in response) {
                    var cookie = response[i];

                    if (cookie != null) {
                        var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
                        chrome.cookies.remove({"url": url, "name": cookie.name});
                    }
                }
            });
        }

        function UpdateBadge() {
            chrome.browserAction.setBadgeText({text: badgeCounter.toString()});	
        }

        function SetObjectFlag(obj, flag) { 
            for(var key in obj){
                if (obj[key] === !flag) {
                    obj[key] = flag;
                }
            }
        }

        function GetBrowsingHistory() {
            chrome.history.search({
                'text': '',
                'startTime': startTime
            },
            function(response) {
                $("#lblBh").text(response.length);
                badgeCounter += response.length;
                UpdateBadge();
            });
        }

        function GetCookie(){
            chrome.cookies.getAll({

            }, 
            function(response) {
                $("#lblCo").text(response.length);
                badgeCounter += response.length;
                UpdateBadge();
            });
        }

        function GetDownloadHistory() {
            chrome.downloads.search({

            },
            function(response) {
                $("#lblDh").text(response.length);
                badgeCounter += response.length;
                UpdateBadge();
            });
        }

        $("#btnClean").click(function() {
            if ($("input:checked").length > 0) {
                SetObjectFlag(dataTypeSet, false);

                $($("input:checked")).each(function() {
                    switch (this.value) {
                        case "bh":
                            dataTypeSet.history = true;
                            break;
                        case "ca":
                            dataTypeSet.appcache = true;
                            dataTypeSet.cache = true;
                            dataTypeSet.cacheStorage = true;
                            break;
                        case "co":
                            CleanCookie();
                            dataTypeSet.cookies = true;
                            break;
                        case "dh":
                            dataTypeSet.downloads = true;
                            break;
                        case "pd":
                            dataTypeSet.fileSystems = true;
                            dataTypeSet.formData = true;
                            dataTypeSet.indexedDB = true;
                            dataTypeSet.localStorage = true;
                            dataTypeSet.passwords = true;
                            dataTypeSet.pluginData = true;
                            dataTypeSet.serverBoundCertificates = true;
                            dataTypeSet.serviceWorkers = true;
                            dataTypeSet.webSQL = true;
                            break;
                    }
                });

                CleanByType();
                init();
            }
            else {
                $("#dvAlert").show();
                $("#lblMessage").text("Forgot to select?");
            }
        });

        $("#btnCleanAll").click(function() {
            SetObjectFlag(dataTypeSet, true);
            CleanCookie();
            CleanByType();
            init();
        });

        $('#dvAlert > div > button').on('click', function () {
            $("#dvAlert").hide();
            $("#lblMessage").text("");
        });
    });
})();