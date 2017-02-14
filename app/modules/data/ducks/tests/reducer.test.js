// todo refactor with Jest
import reducer from '../reducer';
import { UPDATE_DATA, REMOVE_ENTITIES, REPLACE_ENTITY } from '../constants';

const state = {
  entities: {
    users: {
      1: {
        name: 'name1',
        roles: ['1'],
      },
      2: {
        name: 'name2',
        roles: ['2'],
      },
    },
    products: {
      1: {
        name: 'prod1',
        images: ['image1', 'image11'],
      },
      2: {
        name: 'prod1',
        images: ['image1', 'image11'],
      },
    },
  },
};

describe('data reducer tests', () => {
  it('should merge specific object', () => {
    const payload = {
      entities: {
        users: {
          1: {
            name: 'name1',
            phone: 'phone1',
          },
          2: {
            roles: [],
          },
        },
      },
      results: [1],
    };
    const expecting = {
      entities: {
        users: {
          1: {
            name: 'name1',
            roles: ['1'],
            phone: 'phone1',
          },
          2: {
            name: 'name2',
            roles: [],
          },
        },
        products: {
          1: {
            name: 'prod1',
            images: ['image1', 'image11'],
          },
          2: {
            name: 'prod1',
            images: ['image1', 'image11'],
          },
        },
      },
      results: [1],
    };
    const newState = reducer(state, { type: UPDATE_DATA, payload });
    expect(newState).toEqual(expecting);
  });

  it('should remove specific object', () => {
    const payload = {
      entities: {
        users: {
          1: {},
        },
      },
      results: [1],
    };
    const expecting = {
      entities: {
        users: {
          2: {
            name: 'name2',
            roles: ['2'],
          },
        },
        products: {
          1: {
            name: 'prod1',
            images: ['image1', 'image11'],
          },
          2: {
            name: 'prod1',
            images: ['image1', 'image11'],
          },
        },
      },
      results: [1],
    };
    const newState = reducer(state, { type: REMOVE_ENTITIES, payload });
    expect(newState).toEqual(expecting);
  });
  it('should replace specific object', () => {
    const payload = {
      entities: {
        users: {
          1: {
            newProp: 'newProp',
          },
        },
      },
      results: [1],
    };
    const expecting = {
      entities: {
        users: {
          1: {
            newProp: 'newProp',
          },
          2: {
            name: 'name2',
            roles: ['2'],
          },
        },
        products: {
          1: {
            name: 'prod1',
            images: ['image1', 'image11'],
          },
          2: {
            name: 'prod1',
            images: ['image1', 'image11'],
          },
        },
      },
      results: [1],
    };
    const newState = reducer(state, { type: REPLACE_ENTITY, payload });
    expect(newState).toEqual(expecting);
  });
});
