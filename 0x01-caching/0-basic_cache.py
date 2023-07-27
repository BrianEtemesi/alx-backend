#!/usr/bin/env python3
"""
implementation of a class `BasicCache` that inherits from `BaseCaching`
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    class representation of a basic cache
    """
    def __init__(self):
        """
        initialize
        """
        super().__init__()

    def put(self, key, item):
        """
        assign to cache_data key value
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """
        returns value linked to key
        """
        if key and key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
