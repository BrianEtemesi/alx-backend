#!/usr/bin/env python3
"""
implements class for FIFO caching
"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """
    class representation of a FIFO cache memory
    """
    def __init__(self):
        """
        initialization
        """
        super().__init__()

    def put(self, key, item):
        """
        sets item to key in cache.data
        """
        max_items = BaseCaching.MAX_ITEMS
        if key and item:
            self.cache_data[key] = item
            if len(self.cache_data) >  max_items:
                first_key = next(iter(self.cache_data))
                del self.cache_data[first_key]
                print("DISCARD: {}".format(first_key))

    def get(self, key):
        """
        returns value linked to key in cache data
        """
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
