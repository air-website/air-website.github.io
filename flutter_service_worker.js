'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "ba67e65a5afdc39922a0c1731ae244df",
"personal_air_logo.jpeg": "542e597cfb22c720b70ac70557a14e94",
"index.html": "53f79d05c627486826b7441db84e0f97",
"/": "53f79d05c627486826b7441db84e0f97",
"main.dart.js": "e7852f94156664db23b1d2d1507282c4",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/personal_air_logo.jpeg": "542e597cfb22c720b70ac70557a14e94",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d6498ae27ae9d597db14213cfdd1d77e",
"assets/AssetManifest.json": "539db4f80bc9f73f17595d6bd80755ac",
"assets/NOTICES": "6c4b79c0e48ab9ef3826bc5e23a42394",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/place_view_page_banner_2.jpeg": "4921cd46aa4cfba9aa21627f08cb3c9e",
"assets/assets/flutter_logo.jpg": "3b2cff58733fffb656d02a0ea5b06efa",
"assets/assets/android_one_logo.jpg": "11e961ced38fe4067c7f3bbc58851261",
"assets/assets/personal_air_logo.jpeg": "542e597cfb22c720b70ac70557a14e94",
"assets/assets/design_pattern_one_logo.jpg": "59eb86597611ed69c0051c5bed1d80f7",
"assets/assets/swift_logo.jpg": "1ac4a93a85d9c5bbc722808267b2a7f7",
"assets/assets/vs_logo.jpg": "cd3456dec418a17acd21f116fcb78418",
"assets/assets/js_html_css_logo.jpg": "81cd6736a65d52cf1b2a8aa7bb1df73b",
"assets/assets/android_two_logo.jpg": "e6e9efabf861e2a87f7f9cab95b41906",
"assets/assets/literature_logo.jpg": "e14d09a9397413dd7ead4f22ddb4ad40",
"assets/assets/totem_two_logo.jpg": "480b1ea10a8ecccb88d4de636616a179",
"assets/assets/react_native_one_logo.jpg": "837849a7d223bb76521e7e500dc7cc9a",
"assets/assets/dart_logo.jpg": "1c7dcb9bd663a3dd1e3dab84b1ed67f4",
"assets/assets/flutter-app-sample.jpg": "4fda7d0e552e39858860246d4f27afbd",
"assets/assets/totem_four_logo.jpg": "1eddbd117063d6e9d10f4a5d6fa9efa1",
"assets/assets/kotlin_logo.jpg": "96bee1d21d99352fa38f72e987449ad5",
"assets/assets/design_pattern_logo.png": "ef25231f5b7a898dd8bdb09537fe32a7",
"assets/assets/place_view_page_banner_0.jpeg": "3e7be19e94da3f466b3d78ac12d4d8d5",
"assets/assets/android_vs_ios.jpg": "d22bf9343444bb4f255fad2b6746b180",
"assets/assets/ios_one_logo.jpg": "7aa554070095b8be0c2069641d9ba506",
"assets/assets/totem_three_logo.jpg": "c192a2bd435c2c36d919adcc5de40aa7",
"assets/assets/git_logo.jpg": "0ed30f7214681e0ac95b03c288d5612a",
"assets/assets/place_view_page_banner_1.jpeg": "4d2821ef6515ace0d7e1f90bcc758c6a",
"assets/assets/banner/4.jpg": "6280168595915f91637d25b807a3480d",
"assets/assets/banner/5.jpg": "05b17ab25ecaee3e56387109597f1405",
"assets/assets/banner/6.jpg": "9642f184d26540f8ad1b3f8206ca37d9",
"assets/assets/banner/2.jpg": "4c8f1390d7c90e0e5f5cb7312b995928",
"assets/assets/banner/3.jpg": "1253d8cf7abf8e92af47bda2bf61bd84",
"assets/assets/banner/1.jpg": "b59df32a650a0c6e7457c2ddae01628f",
"assets/assets/banner/0.jpg": "d346949ddd55a5d99da73c905489eea7",
"assets/assets/js_logo.jpg": "6a733b4bbc17e872b664d9481e0b1a2e",
"assets/assets/totem_one_logo.jpg": "8495c8f64638ca39c8ffcc6186e8c26a",
"assets/assets/react_native_two_logo.jpg": "da6c5e778b7b74972363bb56068a1f1b",
"assets/assets/daily_note_logo.jpg": "998716c63fba8cb412c8a8acfe3b475d",
"assets/assets/java_logo.jpg": "952f22909ab8b797c97d5e6fc1ebfbde"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
