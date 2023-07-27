#!/usr/bin/env python3
"""
implementation of least recently used caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    class representation of a LRU cache
    """
    def __init__(self):
        """
        initialization
        """
        super().__init__()

    def put(self, key, item):
        """
        assign item to key in cache
        """
        if key and item:
            if key in self.cache_data:
                del self.cache_data[key]
            self.cache_data[key] = item

            max_items = BaseCaching.MAX_ITEMS

            if len(self.cache_data) > max_items:
                first_key = next(iter(self.cache_data))
                del self.cache_data[first_key]
                print("DISCARD: {}".format(first_key))

    def get(self, key):
        """
        returns value linked to key from cache
        """
        if key and key in self.cache_data:
            value = self.cache_data[key]
            del self.cache_data[key]
            self.cache_data[key] = value
            return value
        else:
            return None
