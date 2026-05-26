#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pathlib import Path
import re
import urllib.request

UPSTREAM = "https://feed.xyzfm.space/klggceyhvn3h"
OUT = Path("public/ximalaya-clean/feed.xml")


def clean_xml(xml: str) -> str:
    xml = re.sub(
        r'<a[^>]*href=["\']https://www\.xiaoyuzhoufm\.com/player/[^"\']*["\'][^>]*>[\s\S]*?</a>',
        "",
        xml,
        flags=re.I,
    )

    xml = re.sub(
        r'&lt;a[\s\S]*?href=["\']https://www\.xiaoyuzhoufm\.com/player/[^"\']*["\'][\s\S]*?&lt;/a&gt;',
        "",
        xml,
        flags=re.I,
    )

    xml = xml.replace("在小宇宙查看该单集文稿", "")
    xml = xml.replace("小宇宙查看该单集文稿", "")

    xml = re.sub(
        r"https://www\.xiaoyuzhoufm\.com/player/[^\"'<\s]*",
        "",
        xml,
        flags=re.I,
    )
    xml = xml.replace("openTranscript=true", "")
    xml = xml.replace("autoOpen=false", "")
    xml = xml.replace("utm_source=rss", "")

    xml = re.sub(r"<a[^>]*>\s*</a>", "", xml, flags=re.I)
    xml = re.sub(r"&lt;a[^&]*&gt;\s*&lt;/a&gt;", "", xml, flags=re.I)
    xml = re.sub(r"<p>\s*</p>", "", xml, flags=re.I)
    xml = re.sub(r"<p>\s*<br\s*/?>\s*</p>", "", xml, flags=re.I)
    xml = re.sub(r"&lt;p&gt;\s*&lt;/p&gt;", "", xml, flags=re.I)
    xml = re.sub(r"&lt;p&gt;\s*&lt;br\s*/?&gt;\s*&lt;/p&gt;", "", xml, flags=re.I)
    xml = re.sub(r"\n{3,}", "\n\n", xml)

    return xml.strip() + "\n"


def main() -> None:
    req = urllib.request.Request(
        UPSTREAM,
        headers={
            "User-Agent": "Mozilla/5.0 RSS Reader",
        },
    )

    with urllib.request.urlopen(req, timeout=30) as resp:
        xml = resp.read().decode("utf-8")

    cleaned = clean_xml(xml)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(cleaned, encoding="utf-8")

    checks_absent = [
        "在小宇宙查看该单集文稿",
        "小宇宙查看该单集文稿",
        "xiaoyuzhoufm.com/player",
        "openTranscript",
    ]

    for s in checks_absent:
        if s in cleaned:
            raise RuntimeError(f"clean failed, still contains: {s}")

    checks_present = [
        "<rss",
        "<channel>",
        "<item>",
        "<enclosure",
        "itunes:image",
    ]

    for s in checks_present:
        if s not in cleaned:
            raise RuntimeError(f"rss may be broken, missing: {s}")

    print(f"Generated clean RSS: {OUT}")
    print(f"Size: {OUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
