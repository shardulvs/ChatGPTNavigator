document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        if (document.activeElement.tagName === 'TEXTAREA') {
            document.activeElement.blur();
        } else {
            document.querySelector("#prompt-textarea").focus();
        }
        return
    }
    if (event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA") return;
    if (event.target.isContentEditable) return;
    if (event.key === 'j' || event.key === 'k') {
        if (event.key === 'j') {
            chat_scroll(-1)
        }
        if (event.key === 'k') {
            chat_scroll(+1)
        }
    }
});

function chat_scroll(offset) {
    document.activeElement.blur()
    const elements = document.querySelectorAll("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div > article");
    if (chat_scroll.current_index !== undefined) {
        let element = elements[chat_scroll.current_index + offset]
        if (element) {
            scrollToTargetAdjusted(element)
            chat_scroll.current_index += offset

        } else if (offset > 0) {
            scrollToBottom();
        } else {

        }
    } else {

        let index

        if (offset < 0) {
            index = element_just_above(elements);
        }
        if (offset > 0) {
            index = element_just_below(elements)
        }
        if (index !== undefined) {
            chat_scroll.current_index = index;
            scrollToTargetAdjusted(elements[index])

        } else {

        }

    }
}

function element_just_below(elements) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i].querySelector("div > div")
        const rect = element.getBoundingClientRect()
        const top_bar_height = document.querySelector("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div > div").getBoundingClientRect().height;
        if (rect.top - top_bar_height > 0) {
            return i
        }
    }
}

function element_just_above(elements) {
    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i].querySelector("div > div")
        const rect = element.getBoundingClientRect()
        const top_bar_height = document.querySelector("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div > div").getBoundingClientRect().height;
        if (rect.top - top_bar_height < 0) {
            return i
        }
    }
}

function scrollToTargetAdjusted(element) {
    const headerOffset = document.querySelector("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div > div").getBoundingClientRect().height;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;
    document.querySelector("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div").scrollBy({
        top: offsetPosition, behavior: "smooth"
    });
}

function scrollToBottom() {
    const bottom = document.querySelector("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div").getBoundingClientRect().bottom
    document.querySelector("#__next > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div").scrollBy({
        top: bottom, behavior: "smooth"
    });
}

document.addEventListener("wheel", (event) => {
    delete chat_scroll.current_index
})