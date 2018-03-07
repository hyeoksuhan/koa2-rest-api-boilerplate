const chai = require('chai');

describe('Test', () => {
  it('should just pass', () => {
    // empty yet
  });

  it('should throw dummy error', () => {
    return Promise.reject(new Error('dummy'))
      .then(() => {
        chai.Should().fail();
      })
      .catch(err => {
        chai.expect(err.message)
        .to.eql('dummy');
      });
  });
});