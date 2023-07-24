#!/usr/bin/env python3
"""
function to calculate start and end index of a page
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    computes the start and end index of a page
    """
    start_index = (page - 1) * page_size
    end_index = (page * page_size)
    return start_index, end_index
