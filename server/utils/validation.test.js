const expect = require('expect');
const {isRealString} = require('./validation');

describe ('isRealString', () => {
  it('should reject non-string value', () =>{
    var res = isRealString(99);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () =>{
    var res = isRealString('    ');
    expect(res).toBe(false);
  });

  it('should allow sting with non-space characters', ()  =>{
    var res = isRealString(' Andrew ');
    expect(res).toBe(true);
  });
});
