/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export default ({ properties }) =>
  (key = 'Version:asc') => {
    if (key.startsWith('Version:')) {
      return function (itemA, itemB) {
        const [, dir] = key.split(':');
        let a, b;
        if (dir === 'asc') {
          a = itemA;
          b = itemB;
        } else {
          b = itemA;
          a = itemB;
        }

        // Split the versions into arrays of numbers
        const versionA = a.Version.split('.').map((part) => {
          const number = Number(part);
          return isNaN(number) ? 0 : number;
        });
        const versionB = b.Version.split('.').map((part) => {
          const number = Number(part);
          return isNaN(number) ? 0 : number;
        });

        const minLength = Math.min(versionA.length, versionB.length);

        for (let i = 0; i < minLength; i++) {
          const diff = versionA[i] - versionB[i];
          switch (diff) {
            case diff > 0:
              return 1;
            case diff < 0:
              return -1;
            default:
              break;
          }
        }

        return versionA.length - versionB.length;
      };
    }
    return properties(['Name'])(key);
  };
