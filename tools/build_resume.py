"""Compatibility entry point for the current verified resume renderer.

Prefer python tools/resume/render.py. All entry points use the same HTML source.
An optional positional path receives a copy of the current primary PDF.
"""
from pathlib import Path
from runpy import run_path
from shutil import copyfile
import sys

if __name__ == '__main__':
    renderer = Path(__file__).resolve().parent / 'resume/render.py'
    output = run_path(str(renderer))['render']()
    if len(sys.argv) > 1:
        destination = Path(sys.argv[1]).resolve()
        if destination != output.resolve():
            destination.parent.mkdir(parents=True, exist_ok=True)
            copyfile(output, destination)
