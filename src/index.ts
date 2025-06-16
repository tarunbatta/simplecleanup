(function () {
    'use strict';

    $(document).ready(function () {
        const startTime: number = (new Date("01 January, 1970")).getTime();
        let badgeCounter: number = 0;
        let originTypes: chrome.browsingData.SettingDetails['options']['originTypes'] | null = null;
        let dataTypeSet: chrome.browsingData.DataTypeSet | null = null;

        init();

        /**
         * Initializes the application state.
         */
        function init(): void {
            if ($("#lblMessage").text().length === 0) {
                $("#dvAlert").hide();
            }

            $("input:checkbox").prop('checked', false);

            badgeCounter = 0;

            chrome.browsingData.settings(function (response) {
                originTypes = response.options.originTypes;
                dataTypeSet = response.dataRemovalPermitted; //response.dataToRemove
            });

            getBrowsingHistory();
            getCookie();
            getDownloadHistory();
        }

        /**
         * Cleans browsing data based on selected types.
         */
        function cleanByType(): void {
            if (dataTypeSet && dataTypeSet.hasOwnProperty("cacheStorage")) {
                delete (dataTypeSet as any).cacheStorage;
            }

            if (dataTypeSet && originTypes) {
                chrome.browsingData.remove({
                    "since": startTime,
                    "originTypes": originTypes
                },
                    dataTypeSet,
                    function () {
                        $("#dvAlert").show();
                        $("#lblMessage").text("Cleanup successful!!");
                    });
            }
        }

        /**
         * Removes all cookies.
         */
        function cleanCookie(): void {
            chrome.cookies.getAll({},
                function (cookies: chrome.cookies.Cookie[]) {
                    for (const cookie of cookies) {
                        if (cookie != null) {
                            const url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
                            chrome.cookies.remove({ "url": url, "name": cookie.name });
                        }
                    }
                });
        }

        /**
         * Updates the browser action badge text with the current counter.
         */
        function updateBadge(): void {
            chrome.browserAction.setBadgeText({ text: badgeCounter.toString() });
        }

        /**
         * Sets the flag value for all properties in an object.
         * @param obj - The object to modify.
         * @param flag - The boolean value to set.
         */
        function setObjectFlag(obj: any, flag: boolean): void {
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] === !flag) {
                    obj[key] = flag;
                }
            }
        }

        /**
         * Gets the number of browsing history entries.
         */
        function getBrowsingHistory(): void {
            chrome.history.search({
                'text': '',
                'startTime': startTime
            },
                function (results: chrome.history.HistoryItem[]) {
                    $("#lblBh").text(results.length);
                    badgeCounter += results.length;
                    updateBadge();
                });
        }

        /**
         * Gets the number of cookies.
         */
        function getCookie(): void {
            chrome.cookies.getAll({},
                function (cookies: chrome.cookies.Cookie[]) {
                    $("#lblCo").text(cookies.length);
                    badgeCounter += cookies.length;
                    updateBadge();
                });
        }

        /**
         * Gets the number of download history entries.
         */
        function getDownloadHistory(): void {
            chrome.downloads.search({},
                function (results: chrome.downloads.DownloadItem[]) {
                    $("#lblDh").text(results.length);
                    badgeCounter += results.length;
                    updateBadge();
                });
        }

        $("#btnClean").click(function () {
            if ($("input:checked").length > 0) {
                if (dataTypeSet) {
                    setObjectFlag(dataTypeSet, false);

                    $($("input:checked")).each(function () {
                        switch (this.value) {
                            case "bh":
                                dataTypeSet.history = true;
                                break;
                            case "ca":
                                dataTypeSet.appcache = true;
                                dataTypeSet.cache = true;
                                (dataTypeSet as any).cacheStorage = true;
                                break;
                            case "co":
                                cleanCookie();
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

                    cleanByType();
                    init();
                }
            } else {
                $("#dvAlert").show();
                $("#lblMessage").text("Forgot to select?");
            }
        });

        $("#btnCleanAll").click(function () {
            if (dataTypeSet) {
                setObjectFlag(dataTypeSet, true);
                cleanCookie();
                cleanByType();
                init();
            }
        });

        $('#dvAlert > div > button').on('click', function () {
            $("#dvAlert").hide();
            $("#lblMessage").text("");
        });
    });
})();