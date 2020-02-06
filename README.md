# ucsb-cs-course-repos/course-repo-jekyll-theme

* Version: 1.2.0 (see: [semver](https://semver.org/) for explanation and [VERSION.md](VERSION.md) for version history)


This is a Jekyll Theme for hosting websites for courses.
* Compatible with Github Pages
* Course content can be authored in Markdown or HTML, or a mix
* Supports:
   * Separation of Content from formatting
   * Separation of Content global to a course from that associated with
      a particular course offering
   * Parameterizing content to avoid copy/paste errors (e.g. factoring out
      content that can vary into variables and macros)
   * Making content DRY in the sense of "don't repeat yourself"
* Inspired by, but not derived from:
   * [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/)
   * [academicpages](https://academicpages.github.io/)
* Features of the following are available:
   * Bootstrap
   * JQuery
   * Font-Awesome
   * Liquid Syntax
   * Rouge for syntax highlighting



Features Removed from Earlier Versions
--------------------------------------

The following features were removed because it wasn't clear there was
any widespread use of them.

If they are desired, they can be added back in a future release:

* Support for flipclock, via `flipclock.js` and `flipclock.css`

TODO
----

* In `lecture_next_prev_links.html`, there is a loop that's probably O(n^2).  Try replacing with JS code that will run in time O(n).
* Can `head.html` and `head_hwk.html` be refactored into a single file with some variables to switch on or off the extra css and js for homework assignments?
