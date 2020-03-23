import $ from 'jquery';
import ProgressBar from 'progressbar.js';

import './index.html';
import './style/style.css';

import './images/profile.jpg';
import './images/adobe-certified.png';
import './images/eni.jpg';
import './images/nexi.it.jpg';
import './images/smartpos.jpg';

(() => {
    //expose jquery to browser
    window.$ = $;
    window.jQuery = $;

    const texts = ['Hello!', "I'm Michele Scala", 'Who am I?', "I'm a developer!"];

    /**
     * Commands map
     */
    const knownCommands = {
        who: {
            match: /michele scala|scala michele|scala|michele|who|who is michele scala|who is scala michele|kele23|kele/gi,
            text: 'Michele Scala',
            description: 'Who is Michele Scala?'
        },
        projects: {
            match: /work|projects?/gi,
            text: 'Projects',
            description: 'Some interesting projects made by Michele Scala'
        },
        gist: {
            match: /gists?|github gists|gist-.+/gi,
            text: 'GitHub Gists',
            description: 'Informations about Michele Scala GitHub GIST',
            beforeLoad: async (text) => {
                let groups = text.match(/gist-(.+)/);
                console.log(groups);
                if (groups && groups.length > 1) {
                    $('#gist-list').addClass('st-hidden');
                    const gistContent = await $.ajax({
                        url: `https://gist.github.com/kele23/${groups[1]}.json`,
                        dataType: 'jsonp'
                    }).then();
                    $('#gist-content').html(gistContent.div);
                    $('#gist-content').removeClass('st-hidden');
                } else {
                    $('#gist-list').removeClass('st-hidden');
                    $('#gist-content').addClass('st-hidden');
                }
            }
        },
        ls: {
            text: 'ls',
            match: /ls/gi,
            description: 'Available commands'
        }
    };
    /**
     * Mapping conversion to text -> command
     */
    const mapping = {};

    const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

    /**
     * Show the answer of the question number provided
     * @param {number} questionNumber
     */
    const showCommand = (command, text) => {
        let $answer = $(`[data-command=${command}]`);
        if (!$answer || $answer.length <= 0) {
            console.warn('Cannot show command answer, no answer provided in HTML file');
            return;
        }

        if (knownCommands[command].beforeLoad) {
            knownCommands[command].beforeLoad(text);
        }

        if ($answer) $('#questions').addClass('st-hidden');
        $('.content-par').addClass('st-hidden');
        $answer.removeClass('st-hidden');
        $('#content').removeClass('st-hidden');

        $($answer)
            .find('.progress-bar')
            .each((_, element) => {
                var bar = $(element).data('bar');
                bar.set(0);
                const value = $(element).data('value') / 100;
                bar.animate(value);
            });
    };

    /**
     * Map Typed text to another text
     * @param {String} text
     */
    const getMapping = (text) => {
        for (var mapKey in mapping) {
            if (text.toLowerCase().trim() == mapping[mapKey].toLowerCase().trim()) {
                return mapKey;
            }
        }
    };

    /**
     * Get the typed text from command list
     * @param {*} textTyped
     */
    const getCommand = (text) => {
        for (var key in knownCommands) {
            const cmdText = knownCommands[key].text;
            if (cmdText.toLowerCase().trim() == text.toLowerCase().trim()) {
                return key;
            }

            const match = knownCommands[key].match;
            if (
                match &&
                text
                    .toLowerCase()
                    .trim()
                    .match(match)
            ) {
                return key;
            }
        }
        return null;
    };

    /**
     * Show the question related to the typed text
     * @param {*} textTyped
     */
    const handleText = (textTyped) => {
        let mapping = getMapping(textTyped);
        mapping = mapping && mapping.length > 0 ? mapping : textTyped;
        let command = getCommand(mapping);
        if (command) {
            showCommand(command, mapping);
        }
    };

    /**
     * Write question to typewriting
     * @param {String} text
     */
    const writeQuestion = (event) => {
        let text = $(event.target).html();
        $('#typewriting').html(text);
        handleText(text);
    };

    const startTyping = () => {
        $('#typewriting').html('');
        $('#info-typewriting').removeClass('st-hidden');
        $('#typewriting').attr('contenteditable', true);
        $('#questions').removeClass('st-hidden');
    };

    /**
     * Close the question response
     */
    const closeContent = () => {
        $('#content').addClass('st-hidden');
        $('#questions').removeClass('st-hidden');
        $('#typewriting').html('');
    };

    /**
     * Handle keydown during text typing
     * @param {Event} event
     */
    const onKeydown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            let content = $(event.target).html();
            if (!content || content.length == 0) {
                closeContent();
            } else {
                handleText(content);
            }
        }
    };

    /**
     * Write the string into the #typewriting with time delay effect
     * @param {String} text
     */
    const writeText = async (text, delayTime) => {
        $('#typewriting').html('');
        for (let i = 0; i < text.length; i++) {
            let partialWorld = text.substring(0, i + 1);
            $('#typewriting').html(partialWorld);
            await delay(delayTime);
        }
    };

    //events
    $(document).on('keydown', '#typewriting', onKeydown);
    $(document).on('click', '#close-content', closeContent);
    $(document).on('click', 'a.command', writeQuestion);

    //start
    (() => {
        console.log('Why are you seeing console??');
        console.log('What are you looking for??');

        //initialize questions and show all
        for (var key in knownCommands) {
            $('#ls-commands').append(
                `<p>> <a href="javascript:void(0);" class="command st-px-2 first:st-pl-0">${
                    knownCommands[key].text
                }</a> - ${knownCommands[key].description} <br/>
                <span class="st-text-xs">${
                    knownCommands[key].match ? knownCommands[key].match.toString() : knownCommands[key].text
                }</span></p>`
            );
        }

        //initialize progress bar
        //initialize progress bar
        $('.progress-bar').each((_, element) => {
            var bar = new ProgressBar.Line(element, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#FFF',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: { width: '100%', height: '100%' },
                text: {
                    style: {
                        // Text color.
                        // Default: same as stroke color (options.color)
                        color: '#999',
                        position: 'absolute',
                        right: '0',
                        top: '5px',
                        padding: 0,
                        margin: 0,
                        transform: null
                    },
                    autoStyleContainer: false
                },
                step: (_, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });

            $(element).data('bar', bar);
        });

        //show all
        $('#main-wrapper').show();

        //load gist
        (async () => {
            const results = await $.get('https://api.github.com/users/kele23/gists').then();
            for (var i in results) {
                const result = results[i];
                mapping[`gist-${result.id}`] = result.description;
                $('#gist-list').append(
                    `<p>> <a href="javascript:void(0);" class="command st-px-2 first:st-pl-0">${result.description}</a> <br/> <span class="st-text-xs">gist-${result.id}</span></p>`
                );
            }
        })();

        //launch typing
        (async () => {
            for (let i = 0; i < texts.length; i++) {
                await writeText(texts[i], 80);
                await delay(2000);
            }
            startTyping();
        })();
    })();
})();
