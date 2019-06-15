/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against our application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
      /* This makes sure that the
       * allFeeds variable has been defined and that it is not
       * empty
       */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* This loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */

      it('urls are defined', function() {
        for (let feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.constructor).toBe(String);
          expect(feed.url.length).not.toBe(0);
        }
      });

      /* This loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */

      it('each has names', function() {
        for (let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.constructor).toBe(String);
          expect(feed.name.length).not.toBe(0);
        }
      });
    });

    describe('The Menu', function() {
      /* This ensures the menu element is hidden by default */

      it('menu is hidden', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /* This test ensures the menu changes visibility
       * when the menu icon is clicked/toggled.
       */
      it('menu toggles onclick', function() {
        $('a.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('a.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    describe('Initial Entries', function() {
      /* This test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */

      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it('at least a single entry', function() {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    describe('New Feed Selection', function() {
      let prevFeed;
      let newFeed;
      /* This test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
      beforeEach(function(done) {
        loadFeed(0, function() {
          // store old feed
          prevFeed = $('.feed').html();
          // get newer feed
          loadFeed(1, function() {
            newFeed = $('.feed').html();
            done();
          });
        });
      });

      it('feed content changes', function() {
        expect(prevFeed).not.toBe(newFeed);
      });
    });
  })()
);
