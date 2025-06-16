// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//     alert("111");

//     if (changeInfo.status == 'complete' && tab.active) {
//         alert("222");

//         var startTime = (new Date("01 January, 1970")).getTime();
//         var badgeCounter = 0;

//         init();

//         function init() {
//             badgeCounter = 0;

//             console.log(chrome);

//             GetBrowsingHistory();
//             GetCookie();
//             GetDownloadHistory();
//         }

//         function UpdateBadge() {
//             chrome.browserAction.setBadgeText({text: badgeCounter.toString()});	
//         }

//         function GetBrowsingHistory() {
//             chrome.history.search({
//                 'text': '',
//                 'startTime': startTime
//             },
//             function(response) {
//                 $("#lblBh").text(response.length);
//                 badgeCounter += response.length;
//                 UpdateBadge();
//             });
//         }

//         function GetCookie(){
//             chrome.cookies.getAll({

//             }, 
//             function(response) {
//                 $("#lblCo").text(response.length);
//                 badgeCounter += response.length;
//                 UpdateBadge();
//             });
//         }

//         function GetDownloadHistory() {
//             chrome.downloads.search({

//             },
//             function(response) {
//                 $("#lblDh").text(response.length);
//                 badgeCounter += response.length;
//                 UpdateBadge();
//             });
//         }
//     }
// });