const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Yu',
      room: 'Node Course',
    }, {
      id: '2',
      name: 'Meng',
      room: 'React Course',
    }, {
      id: '3',
      name: 'Jen',
      room: 'Node Course',
    }];
  });
  it('should add new user', () => {
    const user = {
      id: '123',
      name: 'Tyrone',
      room: 'The Office Fans',
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    expect([resUser]).toEqual([user]);
  });

  it('should remove a user', () => {
    const user = users.removeUser('1');

    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    const user = users.removeUser('5');

    expect(user).not.toBe('5');
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const user = users.getUser('1');

    expect(user).toEqual(user);
  });

  it('should not find user', () => {
    const user = users.getUser('5');

    expect(user).not.toBe('5');
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Yu', 'Jen']);
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('React Course');

    expect(userList).toEqual(['Meng']);
  });
});
