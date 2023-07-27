#!/usr/bin/env python3
"""
implementation of a lifo caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """
    class representation of a lifo cache
    """
    def __init__(self):
        """
        initialization
        """
        super().__init__()

    def put(self, key, item):
        """
        sets item to key in cache
        """
        max_items = BaseCaching.MAX_ITEMS

        if key and item:
            if len(self.cache_data) > 0:
                last_key = list(self.cache_data.keys())[-1]

            if key in self.cache_data:
                del self.cache_data[key]

            self.cache_data[key] = item

            if len(self.cache_data) > max_items:
                del self.cache_data[last_key]
                print("DISCARD: {}".format(last_key))

    def get(self, key):
        """
        returns value linked to key from cache
        """

        if key and key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
