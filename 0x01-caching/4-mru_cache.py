#!/usr/bin/env python3
"""
implementation of a most recent recently used caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """
    class representation of an MRU cache
    """
    def __init__(self):
        """
        initialisation
        """
        super().__init__()

    def put(self, key, item):
        """
        assign item to key in cache
        """
        if key and item:
            if key in self.cache_data:
                del self.cache_data[key]

            if len(self.cache_data) > 0:
                last_key = list(self.cache_data.keys())[-1]

            self.cache_data[key] = item

            max_items = BaseCaching.MAX_ITEMS

            if len(self.cache_data) > max_items:
                del self.cache_data[last_key]
                print("DISCARD: {}".format(last_key))

    def get(self, key):
        """
        returns value associated with key in cache
        """
        if key and key in self.cache_data:
            value = self.cache_data[key]
            del self.cache_data[key]
            self.cache_data[key] = value
            return value
        else:
            return None
