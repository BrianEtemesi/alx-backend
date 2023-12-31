#!/usr/bin/env python3
"""
implementation of a least frequently used caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """
    class representation of a LFU cache
    """
    def __init__(self):
        """
        inotialization
        """
        super().__init__()
        self.count = {}

    def put(self, key, item):
        """
        sets item to key in cache
        """
        if key and item:
            dict_cp = {}

            for key_, value in self.count.items():
                dict_cp[key_] = value

            if key in self.cache_data:
                del self.cache_data[key]
                self.count[key] += 1
            else:
                self.count[key] = 1

            self.cache_data[key] = item

            max_items = BaseCaching.MAX_ITEMS

            if len(self.cache_data) > max_items:
                freq = list(dict_cp.values())
                least_freq = min(freq)
                key_list = []

                for _key, value in dict_cp.items():
                    if value == least_freq:
                        key_list.append(_key)

                LFU_key = key_list[0]
                del self.cache_data[LFU_key]
                del self.count[LFU_key]
                print("DISCARD: {}".format(LFU_key))

    def get(self, key):
        """
        return value linked to key in cache
        """
        if key and key in self.cache_data:
            self.count[key] += 1
            return self.cache_data[key]
        else:
            return None
