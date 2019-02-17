asyncAnswers = {
  /**
   * Asynchronously returns a value via a promise. Example:
   * async('anyValue').then((result) => { return result === 'anyValue';});
   *
   * @param value - Any value
   * @returns {then: function} A promise like object containing a then property.
   */
  async: function async(value) {
    const promise1 = Promise.resolve(value);
    return promise1.then(value => value);
  },

  /**
   * Creates a promise that resolves with the data returned from an ajax call to the url url.
   * You may use jquery, XMLHttpRequest, or fetch.
   * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
   * https://api.jquery.com/jQuery.ajax/
   * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API   *
   *
   * @param {String} url - a valid url
   * @returns {then: function} A promise like object containing a then property.
   */
  manipulateRemoteData: function manipulateRemoteData(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {}, 5000).then(
        (response) => {
          if (response.ok) {
            response
              .json()
              .then(data => ({
                data,
                status: response.status,
              }))
              .then((res) => {
                const a = [];
                res.data.people.map((nam) => {
                  a.push(nam.name);
                });
                return resolve(a.sort());
              });
          }
        },
        error => reject(new Error(error.message)),
      );
    });
  },
};
