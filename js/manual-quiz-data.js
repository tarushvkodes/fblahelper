/* ─── manual-quiz-data.js ─── Manual curated decks and question overrides. ─── */

(function attachManualQuizData(window) {
  const MANUAL_ANSWER_OVERRIDES = new Map([
    [norm("Your server room has become warm all of a sudden. Which of the following must you check?"), 3],
    [norm("What is IFL?"), 3]
  ]);
  const MANUAL_EVENT_DECKS = {
    "Computer Applications": [
      {
        q: "Which spreadsheet feature is most useful for automatically recalculating totals when source values change?",
        options: [
          "Static text boxes",
          "Formulas with cell references",
          "Manual highlighting",
          "Page margins"
        ],
        answer: 1,
        explain: "Computer Applications tasks reward efficient use of formulas and linked data rather than manual re-entry.",
        optionExplanations: [
          "Not correct. Text boxes do not perform calculations.",
          "Correct. Formulas with cell references update automatically when data changes.",
          "Not correct. Highlighting is visual only.",
          "Not correct. Margins affect layout, not calculations."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "When creating a professional document in a word processor, which feature is best for keeping heading styles consistent throughout the file?",
        options: [
          "Manual font changes on each heading",
          "Built-in styles",
          "Random color changes",
          "Multiple text boxes"
        ],
        answer: 1,
        explain: "Built-in styles create consistency and make longer documents easier to edit and navigate.",
        optionExplanations: [
          "Not correct. Manual formatting is slower and less consistent.",
          "Correct. Styles standardize formatting across the document.",
          "Not correct. Color changes do not manage structure.",
          "Not correct. Text boxes are not the best tool for document-wide heading consistency."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "Which presentation design choice most improves readability for an audience?",
        options: [
          "Using long paragraphs on each slide",
          "Using high-contrast text with concise bullet points",
          "Adding as many animations as possible",
          "Using multiple decorative fonts on every slide"
        ],
        answer: 1,
        explain: "Readable slides emphasize contrast, brevity, and clean visual hierarchy.",
        optionExplanations: [
          "Not correct. Large text blocks are harder for audiences to follow.",
          "Correct. Concise content and strong contrast improve readability.",
          "Not correct. Excess animation often distracts from the message.",
          "Not correct. Too many fonts reduce clarity."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "In a database table, what is the main purpose of a primary key?",
        options: [
          "To change the font color of records",
          "To uniquely identify each record",
          "To sort all records alphabetically only",
          "To store duplicate values"
        ],
        answer: 1,
        explain: "Primary keys are essential for identifying records and building reliable relationships between tables.",
        optionExplanations: [
          "Not correct. Keys are not formatting tools.",
          "Correct. A primary key uniquely identifies each row in the table.",
          "Not correct. Sorting is separate from key structure.",
          "Not correct. Primary keys should avoid duplicates."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "Which action best helps ensure an email attachment is sent professionally?",
        options: [
          "Leaving the subject line blank",
          "Mentioning the attachment in the message and using a clear file name",
          "Using all lowercase with no punctuation",
          "Attaching multiple unlabeled drafts"
        ],
        answer: 1,
        explain: "Professional email communication includes clear context and organized filenames.",
        optionExplanations: [
          "Not correct. A blank subject line is unprofessional.",
          "Correct. Referencing the file and naming it clearly helps the recipient.",
          "Not correct. Informal formatting weakens professionalism.",
          "Not correct. Unlabeled drafts create confusion."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "Which spreadsheet function is best for finding the average of a range of values?",
        options: [
          "COUNT",
          "SUM",
          "AVERAGE",
          "MAX"
        ],
        answer: 2,
        explain: "AVERAGE is the standard function for mean calculation.",
        optionExplanations: [
          "Not correct. COUNT counts populated cells.",
          "Not correct. SUM totals values without dividing.",
          "Correct. AVERAGE returns the mean of the selected range.",
          "Not correct. MAX returns only the largest value."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "What is the best reason to use slide master or theme settings in a presentation?",
        options: [
          "To make each slide use unrelated formatting",
          "To apply consistent design across the entire presentation",
          "To hide all slide titles",
          "To prevent saving the file"
        ],
        answer: 1,
        explain: "Theme and slide master tools improve consistency and save time in production tasks.",
        optionExplanations: [
          "Not correct. Consistency is the goal, not randomness.",
          "Correct. Slide masters and themes keep design unified.",
          "Not correct. Titles are often important for structure.",
          "Not correct. These tools do not affect file-saving permissions."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "If a formula should always reference one specific cell when copied, which reference type should be used?",
        options: [
          "Relative reference",
          "Absolute reference",
          "Circular reference",
          "Hidden reference"
        ],
        answer: 1,
        explain: "Absolute references lock the row and column so the formula points to the same cell when filled.",
        optionExplanations: [
          "Not correct. Relative references change when copied.",
          "Correct. Absolute references keep the target fixed.",
          "Not correct. Circular references create formula problems.",
          "Not correct. 'Hidden reference' is not the correct spreadsheet concept."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "Which file-naming practice is most professional for submitted work?",
        options: [
          "finalfinalREAL2.docx",
          "Document1.docx",
          "Lastname_Event_TaskName.docx",
          "asdf.docx"
        ],
        answer: 2,
        explain: "Clear, organized file names help judges or reviewers identify work quickly and avoid confusion.",
        optionExplanations: [
          "Not correct. This naming style is unclear and disorganized.",
          "Not correct. Generic names are easy to misplace.",
          "Correct. Structured filenames are the most professional.",
          "Not correct. This does not communicate useful information."
        ],
        source: "manual-curated:computer-applications"
      },
      {
        q: "Before submitting a production file, what is the most important final step?",
        options: [
          "Change the entire document to bright colors",
          "Proofread and verify the file matches all instructions",
          "Delete page numbers without checking",
          "Add extra content not requested"
        ],
        answer: 1,
        explain: "Production tests reward accuracy and instruction-following, so final review matters.",
        optionExplanations: [
          "Not correct. Visual changes should support the task, not distract from it.",
          "Correct. Final proofreading and instruction checks prevent avoidable mistakes.",
          "Not correct. Removing content blindly can create errors.",
          "Not correct. Extra unrequested content can hurt the submission."
        ],
        source: "manual-curated:computer-applications"
      }
    ],
    "Future Business Educator": [
      {
        q: "Which lesson objective is best written as a measurable student outcome?",
        options: [
          "Students will understand budgeting.",
          "Students will appreciate accounting.",
          "Students will list three advantages of a balanced budget.",
          "Students will enjoy the lesson."
        ],
        answer: 2,
        explain: "Strong lesson objectives use observable, measurable verbs so student mastery can be assessed clearly.",
        optionExplanations: [
          "Not correct. 'Understand' is too vague to measure directly.",
          "Not correct. 'Appreciate' is not easily measurable.",
          "Correct. 'List three advantages' is specific and measurable.",
          "Not correct. Enjoyment is not the instructional objective."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "Which classroom strategy best supports formative assessment during instruction?",
        options: [
          "Waiting until the unit test to check understanding",
          "Using quick exit tickets and adjusting instruction from the results",
          "Grading only homework completion",
          "Assigning the same project without feedback"
        ],
        answer: 1,
        explain: "Formative assessment checks understanding during learning so the teacher can adjust instruction in real time.",
        optionExplanations: [
          "Not correct. That is summative, not formative, assessment.",
          "Correct. Exit tickets provide fast evidence of learning and help guide next steps.",
          "Not correct. Completion alone does not measure understanding well.",
          "Not correct. Formative assessment requires feedback and instructional response."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "A teacher wants to support students with different readiness levels in the same class. Which approach is best?",
        options: [
          "Use identical tasks with no variation",
          "Differentiate by adjusting content, process, or product",
          "Lower expectations for the whole class",
          "Grade all students on participation only"
        ],
        answer: 1,
        explain: "Differentiation helps teachers meet diverse learner needs while maintaining rigorous expectations.",
        optionExplanations: [
          "Not correct. That does not respond to varying student needs.",
          "Correct. Differentiation is the standard approach for mixed-readiness classrooms.",
          "Not correct. High expectations should remain in place.",
          "Not correct. Participation alone is not a sound instructional strategy."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "Which teacher action best establishes effective classroom management at the start of a course?",
        options: [
          "Changing rules every week",
          "Setting clear routines, expectations, and consequences early",
          "Avoiding procedures so students feel relaxed",
          "Responding only after major disruptions occur"
        ],
        answer: 1,
        explain: "Strong classroom management is proactive and built on clear expectations and consistent routines.",
        optionExplanations: [
          "Not correct. Inconsistency weakens classroom management.",
          "Correct. Clear procedures and consistency are foundational.",
          "Not correct. Students need structure, not the absence of procedures.",
          "Not correct. Waiting for disruptions is reactive rather than proactive."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "When designing a business lesson, which sequence is usually the strongest instructional flow?",
        options: [
          "Assessment, closure, instruction, objective",
          "Objective, instruction, guided practice, assessment, closure",
          "Closure, lecture, test, homework",
          "Hook, dismissal, worksheet, objective"
        ],
        answer: 1,
        explain: "A clear instructional arc moves from target to teaching to practice to assessment and closure.",
        optionExplanations: [
          "Not correct. The order is not instructionally coherent.",
          "Correct. This sequence reflects a strong standards-aligned lesson structure.",
          "Not correct. It skips essential practice and lesson design steps.",
          "Not correct. The sequence is incomplete and out of order."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "Which feedback statement is most effective for improving student work?",
        options: [
          "Good job.",
          "This is wrong.",
          "Your explanation is clear, but add evidence from the balance sheet to support your conclusion.",
          "Redo everything."
        ],
        answer: 2,
        explain: "Effective feedback is specific, actionable, and tied to the learning target.",
        optionExplanations: [
          "Not correct. It is too general to guide improvement.",
          "Not correct. It identifies a problem but gives no useful direction.",
          "Correct. It tells the student what is working and what to improve next.",
          "Not correct. It is vague and not instructional."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "Which assessment is most appropriate for measuring whether students can apply spreadsheet skills in a business context?",
        options: [
          "A matching vocabulary quiz only",
          "A hands-on task building and formatting a working spreadsheet",
          "An attendance check",
          "A class discussion with no rubric"
        ],
        answer: 1,
        explain: "Performance tasks are the best way to assess applied technical skills.",
        optionExplanations: [
          "Not correct. Vocabulary alone does not show skill application.",
          "Correct. A hands-on performance task directly measures spreadsheet competence.",
          "Not correct. Attendance does not assess mastery.",
          "Not correct. Without criteria, the assessment is too weak."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "A teacher wants to make instruction more accessible without lowering rigor. Which approach best fits Universal Design for Learning?",
        options: [
          "Provide multiple ways for students to access content and demonstrate learning",
          "Give every student the exact same format and response method",
          "Remove all challenging material",
          "Limit instruction to lecture only"
        ],
        answer: 0,
        explain: "UDL emphasizes multiple means of engagement, representation, and expression while preserving rigor.",
        optionExplanations: [
          "Correct. That is the core idea of UDL.",
          "Not correct. One format does not serve all learners well.",
          "Not correct. Accessibility is not the same as lowering standards.",
          "Not correct. A single delivery method is less accessible."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "Which activity best integrates FBLA into classroom instruction in a meaningful way?",
        options: [
          "Using competitive events and leadership activities to reinforce course standards",
          "Treating FBLA as unrelated to classroom learning",
          "Discussing FBLA only once at the beginning of the year",
          "Replacing all instruction with club meetings"
        ],
        answer: 0,
        explain: "FBLA is strongest when leadership and competition experiences reinforce classroom learning goals.",
        optionExplanations: [
          "Correct. This connects CTSO participation directly to instruction.",
          "Not correct. That misses one of FBLA's major educational benefits.",
          "Not correct. One brief mention does not create real integration.",
          "Not correct. FBLA should enhance instruction, not replace it."
        ],
        source: "manual-curated:future-business-educator"
      },
      {
        q: "After teaching a lesson, what is the most useful reason for teacher reflection?",
        options: [
          "To avoid changing future instruction",
          "To identify what worked, what did not, and how to improve next time",
          "To make grades harder automatically",
          "To reduce lesson planning in the future"
        ],
        answer: 1,
        explain: "Reflection is a professional practice used to improve instruction continuously.",
        optionExplanations: [
          "Not correct. Reflection should inform improvement, not avoid it.",
          "Correct. This is the core purpose of reflective teaching.",
          "Not correct. Reflection is about better teaching, not arbitrary grading changes.",
          "Not correct. Reflection supports planning rather than replacing it."
        ],
        source: "manual-curated:future-business-educator"
      }
    ],
    "Impromptu Speaking": [
      {
        q: "What is the best first step after receiving an impromptu speaking prompt?",
        options: [
          "Start talking immediately with no plan",
          "Identify a clear main point and simple structure",
          "Write a full essay",
          "Focus on memorizing a quote"
        ],
        answer: 1,
        explain: "Impromptu speaking improves when the speaker quickly finds a central point and a usable structure.",
        optionExplanations: [
          "Not correct. Speaking without structure usually weakens clarity.",
          "Correct. A central point and simple structure create a stronger response.",
          "Not correct. Impromptu speaking requires fast planning, not a full essay.",
          "Not correct. A quote can help, but it is not the core first step."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "Which framework is most helpful for organizing a short impromptu response?",
        options: [
          "Point, Reason, Example, Point",
          "Random facts in any order",
          "Question, silence, ending",
          "Title, bibliography, appendix"
        ],
        answer: 0,
        explain: "A simple framework helps the speaker stay organized under time pressure.",
        optionExplanations: [
          "Correct. PREP is a practical impromptu structure.",
          "Not correct. Random order weakens the response.",
          "Not correct. This lacks development.",
          "Not correct. That is not a speaking framework."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "What makes an example especially strong in impromptu speaking?",
        options: [
          "It is specific and clearly tied to the point",
          "It is as long as possible",
          "It is unrelated but dramatic",
          "It replaces the conclusion"
        ],
        answer: 0,
        explain: "Specific examples make a quick response more persuasive and easier to follow.",
        optionExplanations: [
          "Correct. Clear, relevant examples strengthen the message.",
          "Not correct. Length does not guarantee quality.",
          "Not correct. Relevance matters more than drama.",
          "Not correct. Examples support the speech rather than replacing structure."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "How should a speaker handle a topic they did not expect?",
        options: [
          "Panic and apologize repeatedly",
          "Stay calm, simplify the topic, and connect it to a familiar idea",
          "Refuse to answer",
          "Use filler words until time runs out"
        ],
        answer: 1,
        explain: "Composure and simplification are key impromptu skills.",
        optionExplanations: [
          "Not correct. Repeated apologies weaken the response.",
          "Correct. Calm simplification is the strongest strategy.",
          "Not correct. The speaker should still attempt a response.",
          "Not correct. Filler weakens delivery."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "What is the best reason to include transitions in an impromptu speech?",
        options: [
          "To help the audience follow the movement between ideas",
          "To sound more complicated than necessary",
          "To avoid making a conclusion",
          "To fill extra time only"
        ],
        answer: 0,
        explain: "Even brief speeches benefit from clear transitions.",
        optionExplanations: [
          "Correct. Transitions improve organization and listener understanding.",
          "Not correct. Complexity is not the goal.",
          "Not correct. A conclusion is still important.",
          "Not correct. Transitions should improve clarity, not just use time."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "Which delivery choice most improves impromptu speaking performance?",
        options: [
          "Speaking with steady pace and confidence",
          "Rushing before ideas are formed",
          "Avoiding eye contact entirely",
          "Keeping a monotone voice"
        ],
        answer: 0,
        explain: "Strong delivery helps an impromptu response sound more controlled and persuasive.",
        optionExplanations: [
          "Correct. Pace and confidence improve clarity and audience trust.",
          "Not correct. Rushing usually hurts coherence.",
          "Not correct. Eye contact still matters.",
          "Not correct. Monotone delivery reduces engagement."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "What is the strongest role of the conclusion in an impromptu speech?",
        options: [
          "To reinforce the main point and end cleanly",
          "To add an unrelated new idea",
          "To apologize for time limits",
          "To restate every detail from the body"
        ],
        answer: 0,
        explain: "A clean finish gives the speech stronger impact and completeness.",
        optionExplanations: [
          "Correct. The conclusion should bring the response back to its central idea.",
          "Not correct. New ideas weaken the ending.",
          "Not correct. Apologies are not an effective conclusion.",
          "Not correct. Over-repetition weakens the ending."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "Why is practicing random prompts valuable for impromptu speaking?",
        options: [
          "It builds flexibility and confidence under pressure",
          "It guarantees the exact same topic later",
          "It removes the need for structure",
          "It makes preparation time irrelevant"
        ],
        answer: 0,
        explain: "Random-prompt practice helps speakers build adaptability and speed.",
        optionExplanations: [
          "Correct. Flexibility is one of the key impromptu skills.",
          "Not correct. Practice helps readiness, not prediction.",
          "Not correct. Structure still matters.",
          "Not correct. Preparation time still matters within the event."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "What is the best way to reduce filler words in impromptu speaking?",
        options: [
          "Pause briefly instead of filling silence with 'um' or 'like'",
          "Speak continuously no matter what",
          "Use more slang",
          "End early every time"
        ],
        answer: 0,
        explain: "Brief intentional pauses sound stronger than filler words.",
        optionExplanations: [
          "Correct. A short pause is usually better than verbal filler.",
          "Not correct. Continuous talking can reduce clarity.",
          "Not correct. Slang does not solve filler habits.",
          "Not correct. Ending early is not the real solution."
        ],
        source: "manual-curated:impromptu-speaking"
      },
      {
        q: "What should a speaker prioritize most in an impromptu event?",
        options: [
          "Clear organization and a confident central message",
          "Trying to sound perfect with no substance",
          "Using the most advanced vocabulary possible",
          "Speaking as long as possible regardless of quality"
        ],
        answer: 0,
        explain: "Judges respond most strongly to clarity, structure, and composure.",
        optionExplanations: [
          "Correct. Clear structure and message matter most.",
          "Not correct. Substance is more important than appearing flawless.",
          "Not correct. Vocabulary should serve clarity, not ego.",
          "Not correct. Quality matters more than length."
        ],
        source: "manual-curated:impromptu-speaking"
      }
    ],
    "Introduction to Business Presentation": [
      {
        q: "What is the strongest purpose statement for an introductory business presentation?",
        options: [
          "To talk about a lot of topics without a clear focus",
          "To inform the audience about one clear topic with a defined takeaway",
          "To fill the required time regardless of clarity",
          "To read directly from slides"
        ],
        answer: 1,
        explain: "Strong presentations are focused, audience-centered, and built around a clear message.",
        optionExplanations: [
          "Not correct. Lack of focus weakens a presentation.",
          "Correct. A clear topic and takeaway create a strong presentation purpose.",
          "Not correct. Time alone is not the goal.",
          "Not correct. Reading slides is poor delivery practice."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "Which opening technique is most likely to engage an audience effectively?",
        options: [
          "Starting with 'I didn't really prepare much'",
          "Beginning with a relevant statistic, question, or short scenario",
          "Reading every source citation first",
          "Apologizing for the topic"
        ],
        answer: 1,
        explain: "Effective openings create interest and establish relevance quickly.",
        optionExplanations: [
          "Not correct. This undermines credibility.",
          "Correct. A hook such as a statistic, question, or scenario engages the audience.",
          "Not correct. Source details belong elsewhere.",
          "Not correct. Apologies weaken delivery."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "Which slide design principle best supports audience understanding?",
        options: [
          "Use dense paragraphs on every slide",
          "Use a clean layout with limited text and readable visuals",
          "Use many competing fonts and colors",
          "Fill every slide with animation"
        ],
        answer: 1,
        explain: "Presentation visuals should support the speaker, not overwhelm the audience.",
        optionExplanations: [
          "Not correct. Dense paragraphs are harder to follow.",
          "Correct. Clean, readable visuals support comprehension.",
          "Not correct. Too many fonts and colors create clutter.",
          "Not correct. Excessive animation distracts from the message."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "When organizing a short presentation, what should each main point include?",
        options: [
          "An unrelated joke only",
          "Support such as an example, explanation, or evidence",
          "A repeated apology",
          "A list of random facts with no transitions"
        ],
        answer: 1,
        explain: "Main points are stronger when they are supported by specific, relevant detail.",
        optionExplanations: [
          "Not correct. Humor alone does not develop a point.",
          "Correct. Evidence and explanation make each point persuasive and clear.",
          "Not correct. Apologies do not strengthen content.",
          "Not correct. Random facts weaken structure."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "What is the best role of transitions in a business presentation?",
        options: [
          "To confuse the audience between ideas",
          "To show how one idea connects to the next",
          "To add extra filler time only",
          "To replace the conclusion"
        ],
        answer: 1,
        explain: "Transitions improve flow and help the audience follow the speaker's structure.",
        optionExplanations: [
          "Not correct. Confusion is the opposite of effective transition use.",
          "Correct. Transitions connect ideas and improve coherence.",
          "Not correct. Their purpose is clarity, not filler.",
          "Not correct. A conclusion still serves its own purpose."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "Which delivery habit most improves credibility?",
        options: [
          "Consistent eye contact and confident posture",
          "Looking only at the screen",
          "Reading every sentence word-for-word",
          "Speaking too quietly to avoid mistakes"
        ],
        answer: 0,
        explain: "Audience connection and confident presence are key parts of strong delivery.",
        optionExplanations: [
          "Correct. Eye contact and posture increase confidence and credibility.",
          "Not correct. Looking only at the screen disconnects from the audience.",
          "Not correct. Reading word-for-word weakens engagement.",
          "Not correct. Speaking too quietly hurts effectiveness."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "How should a presenter handle nerves most effectively?",
        options: [
          "Avoid practicing to stay spontaneous",
          "Prepare thoroughly and use breathing or pacing strategies",
          "Speak as fast as possible",
          "Skip the introduction"
        ],
        answer: 1,
        explain: "Preparation and controlled delivery techniques are the healthiest response to presentation anxiety.",
        optionExplanations: [
          "Not correct. Lack of preparation usually increases nerves.",
          "Correct. Practice and pacing strategies help presenters stay composed.",
          "Not correct. Rushing reduces clarity.",
          "Not correct. Skipping structure creates new problems."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "What makes a conclusion effective?",
        options: [
          "Introducing several new ideas",
          "Restating the main message and leaving the audience with a clear closing thought",
          "Ending abruptly without summary",
          "Repeating the title over and over"
        ],
        answer: 1,
        explain: "Strong conclusions reinforce the message and end with purpose.",
        optionExplanations: [
          "Not correct. Conclusions should not open new lines of argument.",
          "Correct. A summary plus a purposeful closing thought is most effective.",
          "Not correct. Abrupt endings feel incomplete.",
          "Not correct. Repetition alone is not a strong ending."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "If a judge asks a question after the presentation, what is the best first step?",
        options: [
          "Interrupt before the question is finished",
          "Listen fully, then answer clearly and directly",
          "Say 'I already explained that' immediately",
          "Ignore the question and continue the speech"
        ],
        answer: 1,
        explain: "Professional Q&A starts with listening carefully and responding directly.",
        optionExplanations: [
          "Not correct. Interrupting is unprofessional.",
          "Correct. Clear listening and direct response show professionalism.",
          "Not correct. Defensive responses hurt credibility.",
          "Not correct. Questions should be addressed."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      },
      {
        q: "Which preparation strategy best improves timing in a competition presentation?",
        options: [
          "Guessing the pace during the event",
          "Practicing with a timer until the presentation fits comfortably within limits",
          "Adding more slides at the last minute",
          "Speaking faster whenever time runs short"
        ],
        answer: 1,
        explain: "Timed practice is the best way to build pacing control before competition.",
        optionExplanations: [
          "Not correct. Guessing pace is unreliable.",
          "Correct. Timed rehearsal is the most dependable timing strategy.",
          "Not correct. Last-minute additions usually hurt pacing.",
          "Not correct. Speeding up often hurts clarity and delivery."
        ],
        source: "manual-curated:introduction-to-business-presentation"
      }
    ],
    "Introduction to Public Speaking": [
      {
        q: "What is the best basic structure for a short introductory speech?",
        options: [
          "Conclusion, body, introduction",
          "Introduction, body, conclusion",
          "Visual aid, body, title slide",
          "Question period only"
        ],
        answer: 1,
        explain: "Even beginning speakers need a clear start, middle, and finish.",
        optionExplanations: [
          "Not correct. That order is backwards.",
          "Correct. Introduction, body, and conclusion is the standard speech structure.",
          "Not correct. Visual aids are optional support, not the structure itself.",
          "Not correct. A speech needs organized content, not just Q&A."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "Which opening is most likely to engage listeners right away?",
        options: [
          "A relevant question or interesting fact",
          "An apology for being nervous",
          "Reading notes without looking up",
          "Saying 'I don't know much about this'"
        ],
        answer: 0,
        explain: "Strong openings capture attention and build audience interest immediately.",
        optionExplanations: [
          "Correct. Questions and relevant facts are effective hooks.",
          "Not correct. Apologies weaken confidence and credibility.",
          "Not correct. Reading down at notes reduces engagement.",
          "Not correct. This undermines trust in the speaker."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "Which delivery habit best improves audience connection?",
        options: [
          "Looking only at the floor",
          "Using eye contact with different parts of the room",
          "Turning your back to the audience often",
          "Reading every sentence from slides"
        ],
        answer: 1,
        explain: "Eye contact helps the speaker appear confident and engaged with the audience.",
        optionExplanations: [
          "Not correct. Looking down disconnects from listeners.",
          "Correct. Eye contact across the room improves engagement.",
          "Not correct. Turning away weakens presence.",
          "Not correct. Reading slides reduces audience connection."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "What is the best purpose of note cards in a speech?",
        options: [
          "To read the entire speech word-for-word",
          "To remind the speaker of key points and transitions",
          "To replace all practice",
          "To hide from the audience"
        ],
        answer: 1,
        explain: "Good speakers use notes as support, not as a full script.",
        optionExplanations: [
          "Not correct. Reading word-for-word usually weakens delivery.",
          "Correct. Note cards should cue important ideas and transitions.",
          "Not correct. Practice is still necessary.",
          "Not correct. Notes are not meant to hide the speaker."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "Which conclusion is most effective?",
        options: [
          "A short restatement of the main idea with a clear closing thought",
          "Introducing a brand-new major point",
          "Stopping suddenly when time is almost up",
          "Saying 'that's all I have'"
        ],
        answer: 0,
        explain: "A strong conclusion reinforces the message and ends with purpose.",
        optionExplanations: [
          "Correct. A summary and clear closing thought make the speech feel complete.",
          "Not correct. Conclusions should not introduce major new ideas.",
          "Not correct. Abrupt endings feel unprepared.",
          "Not correct. This is a weak closing style."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "What is the best way to improve speech timing before competition?",
        options: [
          "Guessing the pace during the event",
          "Practicing with a timer several times",
          "Speaking as fast as possible",
          "Skipping the conclusion to save time"
        ],
        answer: 1,
        explain: "Timed rehearsal is the most reliable way to control pacing.",
        optionExplanations: [
          "Not correct. Guessing leads to inconsistent pacing.",
          "Correct. Practicing with a timer helps the speaker stay within limits.",
          "Not correct. Speeding up often hurts clarity.",
          "Not correct. Cutting structure weakens the speech."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "Which speaking choice best improves clarity?",
        options: [
          "Using a monotone throughout",
          "Speaking with vocal variety and clear pacing",
          "Mumbling to sound relaxed",
          "Rushing through important points"
        ],
        answer: 1,
        explain: "Clear pacing and vocal variety help listeners stay engaged and understand the message.",
        optionExplanations: [
          "Not correct. Monotone delivery reduces engagement.",
          "Correct. Variety and pacing improve clarity and interest.",
          "Not correct. Mumbling hurts comprehension.",
          "Not correct. Rushing makes important ideas harder to follow."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "If a judge asks a follow-up question, what should the speaker do first?",
        options: [
          "Interrupt before the question is finished",
          "Listen carefully, then answer directly",
          "Ignore the question",
          "Repeat the entire speech"
        ],
        answer: 1,
        explain: "Good Q&A starts with active listening and a direct response.",
        optionExplanations: [
          "Not correct. Interrupting is unprofessional.",
          "Correct. Listening first leads to clearer, stronger answers.",
          "Not correct. Questions should be addressed.",
          "Not correct. Repeating the whole speech is ineffective."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "Which posture choice best supports confident speaking?",
        options: [
          "Standing balanced and upright",
          "Leaning heavily on one leg and looking down",
          "Fidgeting constantly",
          "Keeping hands hidden the whole time"
        ],
        answer: 0,
        explain: "Balanced posture helps the speaker look confident and controlled.",
        optionExplanations: [
          "Correct. Upright, balanced posture supports confidence.",
          "Not correct. This posture appears uncertain.",
          "Not correct. Constant fidgeting distracts the audience.",
          "Not correct. Hiding hands can make delivery look tense."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      },
      {
        q: "What is the best reason to rehearse in professional attire before the event?",
        options: [
          "It helps build comfort, presence, and realism",
          "It guarantees a perfect score",
          "It removes the need to practice content",
          "It makes note cards unnecessary"
        ],
        answer: 0,
        explain: "Dress rehearsal helps the competitor feel more prepared and realistic under competition conditions.",
        optionExplanations: [
          "Correct. Rehearsing under realistic conditions improves readiness.",
          "Not correct. Attire alone does not guarantee results.",
          "Not correct. Content practice is still required.",
          "Not correct. Notes and preparation may still be helpful."
        ],
        source: "manual-curated:introduction-to-public-speaking"
      }
    ],
    "Job Interview": [
      {
        q: "What is the best way to answer a behavioral interview question?",
        options: [
          "With unrelated opinions only",
          "Using the STAR method with a specific example",
          "By giving a one-word answer",
          "By changing the topic quickly"
        ],
        answer: 1,
        explain: "The STAR method helps candidates give organized, evidence-based answers.",
        optionExplanations: [
          "Not correct. Opinions alone are weak evidence.",
          "Correct. STAR helps structure a clear and convincing example.",
          "Not correct. One-word answers do not show depth.",
          "Not correct. Avoiding the question hurts credibility."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "Which introduction creates the strongest first impression in an interview?",
        options: [
          "A professional greeting with eye contact and confidence",
          "Looking at the floor and speaking softly",
          "Starting by asking about salary before introductions",
          "Arriving late without explanation"
        ],
        answer: 0,
        explain: "First impressions in interviews are shaped immediately by professionalism and presence.",
        optionExplanations: [
          "Correct. A confident greeting sets the right tone.",
          "Not correct. This weakens confidence and connection.",
          "Not correct. This is poor sequencing for an opening impression.",
          "Not correct. Tardiness harms professionalism."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "When asked about a weakness, which approach is best?",
        options: [
          "Claim you have no weaknesses",
          "Name a real weakness and explain how you are improving it",
          "Blame former teammates",
          "Refuse to answer"
        ],
        answer: 1,
        explain: "Good weakness answers show self-awareness and growth.",
        optionExplanations: [
          "Not correct. This usually sounds unrealistic.",
          "Correct. A real weakness plus improvement plan is the strongest response.",
          "Not correct. Blaming others reflects poorly on professionalism.",
          "Not correct. Refusing to answer is not effective."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "Why should a candidate research the organization before the interview?",
        options: [
          "To tailor answers and ask informed questions",
          "To memorize the company website word-for-word",
          "To avoid discussing the role",
          "To replace resume preparation"
        ],
        answer: 0,
        explain: "Research helps the candidate sound prepared and connect their fit to the role.",
        optionExplanations: [
          "Correct. Preparation improves relevance and professionalism.",
          "Not correct. Memorization is less useful than understanding.",
          "Not correct. Role discussion is central to the interview.",
          "Not correct. Resume preparation is still important."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "What is the best purpose of a resume in an interview event?",
        options: [
          "To replace conversation completely",
          "To present relevant experiences, skills, and achievements clearly",
          "To include every activity from childhood",
          "To use decorative formatting over substance"
        ],
        answer: 1,
        explain: "A strong resume is concise, relevant, and easy for judges or employers to review.",
        optionExplanations: [
          "Not correct. The interview still matters.",
          "Correct. The resume should highlight the most relevant qualifications clearly.",
          "Not correct. Overloading the document hurts focus.",
          "Not correct. Content matters more than decoration."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "If an interviewer asks a stress question, what is the best response strategy?",
        options: [
          "Stay calm and answer professionally",
          "Argue with the interviewer",
          "Laugh at the question",
          "End the interview immediately"
        ],
        answer: 0,
        explain: "Stress questions are often used to test composure, professionalism, and judgment.",
        optionExplanations: [
          "Correct. Calm professionalism is the best response.",
          "Not correct. Arguing shows poor control.",
          "Not correct. This can appear dismissive.",
          "Not correct. The goal is to handle pressure well, not quit."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "Which closing move is most effective at the end of an interview?",
        options: [
          "Ask thoughtful questions and thank the interviewer",
          "Leave without saying anything",
          "Immediately negotiate terms unrelated to the event prompt",
          "Repeat your entire resume"
        ],
        answer: 0,
        explain: "A strong close shows professionalism, interest, and communication skill.",
        optionExplanations: [
          "Correct. Good questions and a professional thank-you create a strong finish.",
          "Not correct. That leaves a poor impression.",
          "Not correct. Timing and relevance matter in a closing.",
          "Not correct. Repetition is less effective than a purposeful close."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "What kind of example is strongest when describing leadership in an interview?",
        options: [
          "A vague statement with no details",
          "A specific situation where your actions led to a positive result",
          "A story about someone else only",
          "A made-up example"
        ],
        answer: 1,
        explain: "Specific evidence is far more persuasive than vague claims.",
        optionExplanations: [
          "Not correct. Vague claims are weak evidence.",
          "Correct. Specific results-based examples are strongest.",
          "Not correct. The interviewer wants evidence about you.",
          "Not correct. Fabrication is unethical and risky."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "Which attire choice best matches interview professionalism?",
        options: [
          "Clean, polished business attire appropriate to the event",
          "Casual clothes chosen for comfort only",
          "Distracting novelty accessories",
          "Wrinkled clothing because content matters more"
        ],
        answer: 0,
        explain: "Professional appearance contributes to the overall impression in interview events.",
        optionExplanations: [
          "Correct. Polished professional attire is the best choice.",
          "Not correct. Comfort alone is not the standard.",
          "Not correct. Distracting attire can hurt presence.",
          "Not correct. Appearance still matters in interviews."
        ],
        source: "manual-curated:job-interview"
      },
      {
        q: "What is the best reason to do a mock interview before competition?",
        options: [
          "To practice content, delivery, and confidence under realistic pressure",
          "To avoid preparing answers",
          "To replace researching the role",
          "To guarantee the same questions will appear"
        ],
        answer: 0,
        explain: "Mock interviews help competitors refine answers and delivery before the real event.",
        optionExplanations: [
          "Correct. Simulation improves readiness and confidence.",
          "Not correct. Preparation still matters.",
          "Not correct. Research remains important.",
          "Not correct. Practice helps readiness, not prediction."
        ],
        source: "manual-curated:job-interview"
      }
    ],
    "Public Speaking": [
      {
        q: "What makes a speech thesis strongest in a competitive public speaking event?",
        options: [
          "It is vague enough to fit any topic",
          "It clearly states the central message of the speech",
          "It is hidden until the conclusion",
          "It includes as many ideas as possible"
        ],
        answer: 1,
        explain: "A clear thesis helps the audience follow the message and structure of the speech.",
        optionExplanations: [
          "Not correct. Vagueness weakens focus.",
          "Correct. A strong thesis clearly states the central idea.",
          "Not correct. The audience should know the direction earlier.",
          "Not correct. Too many ideas reduce clarity."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "Which support is most persuasive in a competitive speech?",
        options: [
          "Unrelated filler",
          "Specific evidence, examples, and explanation",
          "Repeating the same sentence many times",
          "Speaking longer without substance"
        ],
        answer: 1,
        explain: "Strong speeches develop ideas with evidence and purposeful explanation.",
        optionExplanations: [
          "Not correct. Filler weakens the speech.",
          "Correct. Evidence and explanation make arguments stronger.",
          "Not correct. Repetition alone is not strong support.",
          "Not correct. Length is not the same as quality."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "What is the best use of vocal variety in a speech?",
        options: [
          "To emphasize key ideas and maintain audience interest",
          "To sound as flat as possible",
          "To rush through difficult sections",
          "To avoid pauses completely"
        ],
        answer: 0,
        explain: "Vocal variety helps the speaker sound engaging and intentional.",
        optionExplanations: [
          "Correct. Vocal variety supports emphasis and engagement.",
          "Not correct. Flat delivery reduces impact.",
          "Not correct. Rushing hurts clarity.",
          "Not correct. Strategic pauses are useful."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "Which transition is strongest between major speech points?",
        options: [
          "A statement that shows how the next idea connects to the previous one",
          "A random joke with no connection",
          "Silence with no cue",
          "Reading the outline title only"
        ],
        answer: 0,
        explain: "Transitions should help the audience follow the logic of the speech.",
        optionExplanations: [
          "Correct. Clear connective transitions improve coherence.",
          "Not correct. Random humor can disrupt flow.",
          "Not correct. Lack of transition can confuse listeners.",
          "Not correct. This is usually too weak on its own."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "How should a speaker use gestures most effectively?",
        options: [
          "With natural purpose that reinforces the message",
          "By keeping hands frozen at all times",
          "With constant repetitive motions",
          "By pointing at the audience continuously"
        ],
        answer: 0,
        explain: "Natural, purposeful gestures strengthen communication and presence.",
        optionExplanations: [
          "Correct. Purposeful gestures support meaning and delivery.",
          "Not correct. Overly stiff delivery can look uncomfortable.",
          "Not correct. Repetitive motions distract the audience.",
          "Not correct. Constant pointing is distracting and aggressive."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "What is the best way to handle a brief memory lapse during a speech?",
        options: [
          "Pause, regain composure, and continue",
          "Announce that the speech is ruined",
          "Leave the stage immediately",
          "Start the entire speech over"
        ],
        answer: 0,
        explain: "Composure under pressure is an important part of strong speaking performance.",
        optionExplanations: [
          "Correct. A calm recovery is much better than panic.",
          "Not correct. This magnifies a small problem.",
          "Not correct. Leaving is an extreme overreaction.",
          "Not correct. Restarting is usually unnecessary."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "Which conclusion best strengthens a persuasive speech?",
        options: [
          "A closing that reinforces the thesis and leaves a memorable final thought",
          "An unrelated statistic introduced at the last second",
          "A rushed ending with no summary",
          "Repeating 'thank you' several times only"
        ],
        answer: 0,
        explain: "A strong final impression matters in competitive speaking.",
        optionExplanations: [
          "Correct. The conclusion should reinforce and elevate the message.",
          "Not correct. New unsupported material is weaker here.",
          "Not correct. A rushed ending reduces impact.",
          "Not correct. Gratitude alone is not a full conclusion."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "Why is rehearsal with a live audience useful before competition?",
        options: [
          "It helps test timing, clarity, and audience response",
          "It replaces all other preparation",
          "It guarantees the same judges' reactions",
          "It removes the need for revision"
        ],
        answer: 0,
        explain: "Live rehearsal provides realistic feedback that solo practice cannot fully match.",
        optionExplanations: [
          "Correct. Audience feedback helps refine delivery and pacing.",
          "Not correct. Other preparation is still necessary.",
          "Not correct. Audience practice helps readiness, not prediction.",
          "Not correct. Revision may still be needed."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "What is the best response to a challenging judge question after the speech?",
        options: [
          "Listen fully and answer clearly, even if briefly",
          "Become defensive immediately",
          "Refuse to answer",
          "Repeat the exact same point without addressing the question"
        ],
        answer: 0,
        explain: "Composed Q&A performance is part of strong public speaking competition presence.",
        optionExplanations: [
          "Correct. Careful listening and direct response are best.",
          "Not correct. Defensiveness weakens professionalism.",
          "Not correct. Questions should be addressed.",
          "Not correct. The answer should match the question."
        ],
        source: "manual-curated:public-speaking"
      },
      {
        q: "Which preparation habit best reduces filler words in a speech?",
        options: [
          "Recording rehearsals and revising weak sections",
          "Avoiding practice to stay natural",
          "Talking faster than usual",
          "Using more note cards with full sentences"
        ],
        answer: 0,
        explain: "Filler words improve when speakers notice patterns and rehearse more intentionally.",
        optionExplanations: [
          "Correct. Recording and revision helps identify and reduce filler habits.",
          "Not correct. Lack of practice usually makes filler worse.",
          "Not correct. Speed often reduces clarity.",
          "Not correct. Full-script cards can create other delivery issues."
        ],
        source: "manual-curated:public-speaking"
      }
    ],
    "Sales Presentation": [
      {
        q: "What is the strongest opening move in a sales presentation?",
        options: [
          "Immediately listing product specs with no context",
          "Gaining attention and connecting the presentation to the customer's need",
          "Reading a long company history first",
          "Asking for the sale before discussing value"
        ],
        answer: 1,
        explain: "Effective sales presentations begin by linking the pitch to the buyer's problem or opportunity.",
        optionExplanations: [
          "Not correct. Specs alone do not create customer relevance.",
          "Correct. A need-focused opening is stronger than a generic one.",
          "Not correct. Too much background delays the real pitch.",
          "Not correct. Asking for commitment too early is weak selling."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "What is the difference between a feature and a benefit?",
        options: [
          "A feature is what the product has; a benefit is why it matters to the customer",
          "A feature is always more important than a benefit",
          "A benefit is a technical specification only",
          "There is no meaningful difference"
        ],
        answer: 0,
        explain: "Strong presenters translate product details into customer value.",
        optionExplanations: [
          "Correct. Features describe the offering; benefits explain customer value.",
          "Not correct. Benefits are often what drive the decision.",
          "Not correct. Technical specification is usually a feature, not a benefit.",
          "Not correct. The difference is important in sales."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "How should a presenter handle a customer objection?",
        options: [
          "Ignore it and keep moving",
          "Acknowledge it, respond professionally, and connect back to value",
          "Argue until the customer gives in",
          "Change the topic completely"
        ],
        answer: 1,
        explain: "Professional objection handling is a core part of persuasive selling.",
        optionExplanations: [
          "Not correct. Ignoring objections leaves concerns unresolved.",
          "Correct. Good objection handling is calm, respectful, and value-focused.",
          "Not correct. Arguing usually hurts trust.",
          "Not correct. Avoidance weakens the pitch."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "Which question style best supports consultative selling?",
        options: [
          "Questions that explore the customer's needs and priorities",
          "Questions designed only to trap the customer",
          "Questions unrelated to the product",
          "No questions at all"
        ],
        answer: 0,
        explain: "Consultative selling focuses on understanding the customer's situation before recommending a solution.",
        optionExplanations: [
          "Correct. Need-focused questions improve relevance and credibility.",
          "Not correct. Trap questions damage trust.",
          "Not correct. Irrelevant questions waste time.",
          "Not correct. Questions are central to consultative selling."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "What makes a value proposition strong in a sales presentation?",
        options: [
          "It clearly explains why this solution is useful and different",
          "It avoids mentioning customer needs",
          "It lists features without interpretation",
          "It focuses only on the presenter's preferences"
        ],
        answer: 0,
        explain: "A strong value proposition highlights usefulness, differentiation, and fit.",
        optionExplanations: [
          "Correct. Clear value and differentiation make the pitch stronger.",
          "Not correct. Customer need should be central.",
          "Not correct. Features alone are not enough.",
          "Not correct. Customer value matters more than presenter preference."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "Which close is most effective after a strong presentation?",
        options: [
          "A confident request for the next step or commitment",
          "Ending without asking for anything",
          "Repeating the introduction word-for-word",
          "Apologizing for the pitch"
        ],
        answer: 0,
        explain: "A sales presentation should move naturally toward a clear next step.",
        optionExplanations: [
          "Correct. Good closes ask for commitment or the next action.",
          "Not correct. A weak close wastes the momentum of the pitch.",
          "Not correct. Repetition is less effective than a direct close.",
          "Not correct. Apologizing weakens confidence."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "Why is customer research important before a sales presentation?",
        options: [
          "It helps tailor the pitch to the customer's likely needs",
          "It replaces practicing delivery",
          "It makes objections impossible",
          "It removes the need for product knowledge"
        ],
        answer: 0,
        explain: "Preparation is strongest when the presenter knows both the offering and the audience.",
        optionExplanations: [
          "Correct. Research makes the presentation more relevant and persuasive.",
          "Not correct. Delivery practice still matters.",
          "Not correct. Objections can still happen.",
          "Not correct. Product knowledge is still essential."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "Which visual aid use is most effective in a sales presentation?",
        options: [
          "Using visuals to reinforce key benefits without overcrowding slides",
          "Packing every slide with text",
          "Reading the visual word-for-word",
          "Using unrelated graphics for decoration only"
        ],
        answer: 0,
        explain: "Visuals should support persuasion and clarity, not distract from them.",
        optionExplanations: [
          "Correct. Focused visuals strengthen the presentation.",
          "Not correct. Overcrowded slides reduce clarity.",
          "Not correct. Reading visuals weakens delivery.",
          "Not correct. Decoration without purpose adds little value."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "What is the best way to build credibility during a sales pitch?",
        options: [
          "Use relevant evidence, confidence, and honest claims",
          "Exaggerate results to sound impressive",
          "Avoid answering difficult questions",
          "Dismiss competitor strengths without support"
        ],
        answer: 0,
        explain: "Credibility depends on professionalism, evidence, and honesty.",
        optionExplanations: [
          "Correct. Evidence-based confidence is more persuasive than hype.",
          "Not correct. Exaggeration damages trust.",
          "Not correct. Avoidance weakens credibility.",
          "Not correct. Unsupported claims are less persuasive."
        ],
        source: "manual-curated:sales-presentation"
      },
      {
        q: "If time is limited, what should the presenter prioritize most?",
        options: [
          "The customer's problem, the solution, and the value of acting",
          "Company trivia and filler details",
          "Reading every slide in full",
          "Ignoring the closing"
        ],
        answer: 0,
        explain: "In short pitches, the core message should stay tightly focused on need, solution, and value.",
        optionExplanations: [
          "Correct. Those are the highest-value parts of a sales presentation.",
          "Not correct. Filler should not take priority.",
          "Not correct. Reading every slide is inefficient.",
          "Not correct. The close still matters."
        ],
        source: "manual-curated:sales-presentation"
      }
    ],
    "Public Service Announcement": [
      {
        q: "What is the main purpose of a public service announcement?",
        options: [
          "To promote a commercial product for profit",
          "To inform or persuade the public about an issue and encourage action",
          "To entertain without a message",
          "To list as many statistics as possible"
        ],
        answer: 1,
        explain: "A PSA is designed to serve the public by raising awareness and motivating constructive action.",
        optionExplanations: [
          "Not correct. Commercial product promotion is advertising, not the core purpose of a PSA.",
          "Correct. PSAs are meant to inform or persuade the public about an issue.",
          "Not correct. Entertainment may help, but it is not the primary purpose.",
          "Not correct. Data should support the message, not replace it."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "Which PSA opening is most effective?",
        options: [
          "A strong hook that makes the issue immediately feel relevant",
          "A long explanation of production software",
          "A list of credits before the message starts",
          "Silence for several seconds with no context"
        ],
        answer: 0,
        explain: "PSAs work best when they capture attention quickly and establish urgency or relevance.",
        optionExplanations: [
          "Correct. A strong hook is essential in a short-form message.",
          "Not correct. Production details are not the audience's first priority.",
          "Not correct. The message should come before credits.",
          "Not correct. Context matters immediately in a short PSA."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "What kind of message is strongest in a short PSA?",
        options: [
          "One focused idea with a clear call to action",
          "Several unrelated issues in one script",
          "A message with no target audience",
          "A script that avoids a conclusion"
        ],
        answer: 0,
        explain: "Short PSAs are most effective when they stay focused and actionable.",
        optionExplanations: [
          "Correct. Focus and action make the PSA more memorable and effective.",
          "Not correct. Too many issues weaken clarity.",
          "Not correct. Audience matters in message design.",
          "Not correct. A purposeful ending is important."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "Which production choice most improves PSA quality?",
        options: [
          "Clear audio and visuals that support the message",
          "Crowding the screen with as much text as possible",
          "Using unrelated effects for style only",
          "Ignoring pacing because the topic is important"
        ],
        answer: 0,
        explain: "Technical clarity helps the message land with the audience.",
        optionExplanations: [
          "Correct. Clear audio and purposeful visuals strengthen the PSA.",
          "Not correct. Overcrowding makes content harder to process.",
          "Not correct. Effects should support the message, not distract from it.",
          "Not correct. Pacing is still critical."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "What should the call to action in a PSA do?",
        options: [
          "Tell the audience exactly what step to take next",
          "Stay vague so the audience decides everything",
          "Repeat the problem without any response",
          "Only praise the video production"
        ],
        answer: 0,
        explain: "A strong call to action gives the audience a clear next move.",
        optionExplanations: [
          "Correct. The audience should leave knowing what action is recommended.",
          "Not correct. Vagueness weakens persuasion.",
          "Not correct. A PSA should move beyond awareness into action.",
          "Not correct. Production is secondary to impact."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "Why is audience targeting important in a PSA?",
        options: [
          "It helps shape tone, examples, and message choices",
          "It is unnecessary if the issue is serious",
          "It only matters for commercial ads",
          "It removes the need for facts"
        ],
        answer: 0,
        explain: "Effective PSA messaging depends on matching the audience's needs and context.",
        optionExplanations: [
          "Correct. Audience targeting improves relevance and effectiveness.",
          "Not correct. Serious topics still need strong targeting.",
          "Not correct. Audience awareness matters in PSAs too.",
          "Not correct. Facts still matter."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "What is the best reason to storyboard a PSA before producing it?",
        options: [
          "To plan visuals, pacing, and message flow before editing",
          "To avoid writing a script",
          "To make the PSA longer",
          "To replace all peer feedback"
        ],
        answer: 0,
        explain: "Storyboarding helps the creator organize the message visually before production begins.",
        optionExplanations: [
          "Correct. Storyboards improve flow and production planning.",
          "Not correct. Script development is still important.",
          "Not correct. Length is not the goal.",
          "Not correct. Feedback may still improve the result."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "Which ending is strongest for a PSA?",
        options: [
          "A memorable final line tied to the action the audience should take",
          "A sudden cut with no conclusion",
          "A long unrelated thank-you section",
          "A shift into a product sales pitch"
        ],
        answer: 0,
        explain: "The ending should reinforce the message and make the action memorable.",
        optionExplanations: [
          "Correct. A memorable close reinforces impact.",
          "Not correct. Abrupt endings waste the final impression.",
          "Not correct. Long unrelated credits weaken the message.",
          "Not correct. That changes the purpose of the PSA."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "Which scripting habit usually improves PSA effectiveness most?",
        options: [
          "Using concise language with emotionally and logically relevant details",
          "Adding every fact available regardless of length",
          "Using complex jargon for authority",
          "Avoiding a clear tone"
        ],
        answer: 0,
        explain: "Good PSA scripts are concise, audience-aware, and persuasive without being overloaded.",
        optionExplanations: [
          "Correct. Concise, relevant scripting improves clarity and impact.",
          "Not correct. Overloading information weakens short-form messaging.",
          "Not correct. Jargon can distance the audience.",
          "Not correct. Tone should be intentional."
        ],
        source: "manual-curated:public-service-announcement"
      },
      {
        q: "Before final submission, what is the best final check for a PSA?",
        options: [
          "Confirm the message, timing, and production quality all match the event goals",
          "Add more effects whether needed or not",
          "Remove the call to action to save time",
          "Skip peer review because the draft is finished"
        ],
        answer: 0,
        explain: "Final review should focus on message effectiveness and competition readiness.",
        optionExplanations: [
          "Correct. The final product should align with the event's communication goal and technical expectations.",
          "Not correct. Extra effects may hurt the message.",
          "Not correct. The call to action is central to many PSAs.",
          "Not correct. Feedback can still catch important issues."
        ],
        source: "manual-curated:public-service-announcement"
      }
    ],
    "Introduction to Social Media Strategy": [
      {
        q: "What is the best first step when building a social media strategy?",
        options: [
          "Choose random platforms and start posting",
          "Define the audience and the goal of the campaign",
          "Design graphics before deciding the message",
          "Copy another brand's plan exactly"
        ],
        answer: 1,
        explain: "Strong strategy begins with purpose and audience, not just content creation.",
        optionExplanations: [
          "Not correct. Strategy should begin with planning, not random execution.",
          "Correct. Audience and goal define the rest of the strategy.",
          "Not correct. Visuals come after strategy choices.",
          "Not correct. Borrowing ideas may help, but copying is weak strategy."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "Why is platform selection important in a social media strategy?",
        options: [
          "Because every platform reaches the same people in the same way",
          "Because different platforms fit different audiences and content styles",
          "Because more platforms always means better results",
          "Because strategy should ignore audience habits"
        ],
        answer: 1,
        explain: "Platform fit matters because audience behavior and content expectations vary by channel.",
        optionExplanations: [
          "Not correct. Platforms differ in audience and use.",
          "Correct. Strategy should match the platform to the audience and message.",
          "Not correct. More platforms is not always better.",
          "Not correct. Audience behavior is central to strategy."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "What is the clearest example of a measurable social media goal?",
        options: [
          "Be better online",
          "Increase Instagram engagement rate by 15% in two months",
          "Post more often maybe",
          "Go viral somehow"
        ],
        answer: 1,
        explain: "Good goals are specific and measurable.",
        optionExplanations: [
          "Not correct. This goal is too vague.",
          "Correct. This goal is specific, measurable, and time-bound.",
          "Not correct. It is not precise enough.",
          "Not correct. Virality is not a controlled or measurable strategy target by itself."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "What does a content calendar help a team do?",
        options: [
          "Plan posts consistently and align them with campaign goals",
          "Avoid deadlines completely",
          "Replace analytics",
          "Make every post identical"
        ],
        answer: 0,
        explain: "Content calendars improve consistency, planning, and coordination.",
        optionExplanations: [
          "Correct. Calendars help teams stay strategic and organized.",
          "Not correct. Planning does not remove deadlines.",
          "Not correct. Analytics are still necessary.",
          "Not correct. Variety is often part of a strong content plan."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "Which metric best reflects how actively people are interacting with content?",
        options: [
          "Engagement rate",
          "Office rent",
          "Payroll cost",
          "Shipping time"
        ],
        answer: 0,
        explain: "Engagement rate is a core metric for interaction and audience response.",
        optionExplanations: [
          "Correct. Engagement rate captures interaction with content.",
          "Not correct. This is not a social media performance metric.",
          "Not correct. Payroll is unrelated here.",
          "Not correct. Shipping time is unrelated."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "What is the strongest brand voice choice on social media?",
        options: [
          "A voice that is consistent and appropriate for the target audience",
          "A different personality in every post",
          "A tone with no relation to the brand",
          "Only slang regardless of audience"
        ],
        answer: 0,
        explain: "Brand voice should be recognizable, intentional, and audience-aware.",
        optionExplanations: [
          "Correct. Consistency helps the brand feel clear and trustworthy.",
          "Not correct. Inconsistency weakens identity.",
          "Not correct. Brand voice should align with the brand.",
          "Not correct. Tone should fit the audience and context."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "How should hashtags be used most effectively?",
        options: [
          "Strategically and relevantly, not just in large random batches",
          "By using as many unrelated tags as possible",
          "Only once a year",
          "As a replacement for actual content quality"
        ],
        answer: 0,
        explain: "Hashtags work best when they support discoverability and relevance.",
        optionExplanations: [
          "Correct. Relevance matters more than volume.",
          "Not correct. Random tags can weaken professionalism and reach quality.",
          "Not correct. Strategy requires more consistency than that.",
          "Not correct. Hashtags support content; they do not replace it."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "If a post underperforms, what is the best next step?",
        options: [
          "Review the metrics and adjust content or timing based on what the data suggests",
          "Delete the account immediately",
          "Ignore all analytics",
          "Assume the audience is always wrong"
        ],
        answer: 0,
        explain: "Strategy improves through analysis and adjustment.",
        optionExplanations: [
          "Correct. Data-informed revision is the strongest response.",
          "Not correct. That is an overreaction.",
          "Not correct. Analytics are essential to improvement.",
          "Not correct. Audience response should inform strategy."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "What is the best reason to define KPIs before launching a campaign?",
        options: [
          "So performance can be evaluated against clear targets",
          "So the strategy can avoid measurement",
          "So design decisions are the only focus",
          "So every platform is treated the same"
        ],
        answer: 0,
        explain: "KPIs help teams know whether the campaign is actually working.",
        optionExplanations: [
          "Correct. KPIs turn goals into measurable outcomes.",
          "Not correct. Strategy should not avoid measurement.",
          "Not correct. Design is only one part of performance.",
          "Not correct. Different platforms may require different metrics."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      },
      {
        q: "What is the best final presentation move when explaining a social media strategy to judges?",
        options: [
          "Show how the audience, content plan, and metrics all connect logically",
          "List random platform names without explanation",
          "Focus only on colors and fonts",
          "Skip the rationale to save time"
        ],
        answer: 0,
        explain: "Judges need to see the strategic logic behind the recommendation.",
        optionExplanations: [
          "Correct. Clear rationale is a major part of a strong strategy presentation.",
          "Not correct. Platform names alone do not show strategy.",
          "Not correct. Visuals matter, but strategy matters more.",
          "Not correct. Rationale is essential."
        ],
        source: "manual-curated:introduction-to-social-media-strategy"
      }
    ],
    "Social Media Strategies": [
      {
        q: "What makes a full social media strategy stronger than a simple posting plan?",
        options: [
          "It connects goals, audience, platforms, content, and metrics together",
          "It only focuses on graphic design",
          "It avoids measuring performance",
          "It treats every platform identically"
        ],
        answer: 0,
        explain: "A comprehensive strategy integrates planning, execution, and evaluation.",
        optionExplanations: [
          "Correct. Real strategy connects each decision to the broader goal.",
          "Not correct. Design alone is not enough.",
          "Not correct. Measurement is part of strategy.",
          "Not correct. Platform differences matter."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "Which KPI is most useful when a brand wants to know how many people actually saw its content?",
        options: [
          "Reach",
          "Office staffing",
          "Inventory turnover",
          "Gross margin"
        ],
        answer: 0,
        explain: "Reach measures how many unique users were exposed to the content.",
        optionExplanations: [
          "Correct. Reach is a visibility-focused KPI.",
          "Not correct. This is unrelated to social analytics.",
          "Not correct. Inventory turnover is unrelated here.",
          "Not correct. Gross margin is a financial metric, not a social visibility KPI."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "Why would a strategy use different content pillars?",
        options: [
          "To organize recurring themes and keep the content mix purposeful",
          "To make every post identical",
          "To eliminate audience targeting",
          "To avoid campaign goals"
        ],
        answer: 0,
        explain: "Content pillars help teams balance variety with strategic consistency.",
        optionExplanations: [
          "Correct. Pillars create structure for recurring content themes.",
          "Not correct. Pillars usually support variety, not sameness.",
          "Not correct. Audience targeting still matters.",
          "Not correct. Pillars should support the goals."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "What is the strongest reason to run A/B tests in a social campaign?",
        options: [
          "To compare variations and improve results using evidence",
          "To make the campaign more confusing",
          "To avoid making decisions",
          "To replace all analytics dashboards"
        ],
        answer: 0,
        explain: "A/B testing helps marketers choose stronger creative or strategic options using actual performance data.",
        optionExplanations: [
          "Correct. A/B testing supports evidence-based optimization.",
          "Not correct. The goal is clarity, not confusion.",
          "Not correct. Testing is part of decision-making.",
          "Not correct. Analytics still matter beyond testing."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "Which response best fits strong community management?",
        options: [
          "Responding professionally and promptly to comments or concerns",
          "Ignoring all audience replies",
          "Arguing publicly with customers",
          "Deleting all criticism automatically"
        ],
        answer: 0,
        explain: "Community management affects trust, reputation, and long-term audience relationships.",
        optionExplanations: [
          "Correct. Professional responsiveness strengthens trust.",
          "Not correct. Silence can weaken the brand relationship.",
          "Not correct. Public arguments usually hurt the brand.",
          "Not correct. Some situations require thoughtful response, not automatic deletion."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "When is paid social advertising especially useful?",
        options: [
          "When the campaign needs expanded reach or precise audience targeting",
          "Only when the organic strategy is perfect",
          "When measurement is impossible",
          "When the brand has no objective"
        ],
        answer: 0,
        explain: "Paid social is most useful when reach, targeting, and campaign control matter.",
        optionExplanations: [
          "Correct. Paid promotion can expand and refine campaign delivery.",
          "Not correct. Paid and organic can work together.",
          "Not correct. Paid campaigns are still measurable.",
          "Not correct. Campaign goals should come first."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "What is the best response if a campaign's conversions are strong but engagement is weak?",
        options: [
          "Interpret the results in context and adjust the strategy based on the actual goal",
          "Assume the campaign failed automatically",
          "Ignore the conversion data completely",
          "Stop tracking KPIs"
        ],
        answer: 0,
        explain: "Different KPIs matter differently depending on the campaign objective.",
        optionExplanations: [
          "Correct. Strategy decisions should match the campaign goal.",
          "Not correct. Strong conversions may mean the campaign is working.",
          "Not correct. Conversion data may be highly valuable.",
          "Not correct. Stopping measurement makes strategy worse."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "Why is crisis communication planning important in social media strategy?",
        options: [
          "Because issues can escalate quickly and require a prepared response",
          "Because brands should never respond to problems",
          "Because social media crises disappear on their own",
          "Because analytics are enough without messaging plans"
        ],
        answer: 0,
        explain: "Prepared response plans help brands act quickly and consistently during public issues.",
        optionExplanations: [
          "Correct. Speed and consistency matter in social crises.",
          "Not correct. Silence can worsen problems.",
          "Not correct. Crises often escalate quickly online.",
          "Not correct. Data alone does not replace messaging judgment."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "What is the best reason to segment audiences within a social media strategy?",
        options: [
          "Different groups may respond to different messages and content",
          "Because all audiences behave exactly the same",
          "Because segmentation removes the need for branding",
          "Because one message always fits everyone equally well"
        ],
        answer: 0,
        explain: "Audience segmentation helps strategies become more relevant and effective.",
        optionExplanations: [
          "Correct. Audience differences shape messaging and platform choices.",
          "Not correct. Audience behavior varies.",
          "Not correct. Branding still matters.",
          "Not correct. One-size-fits-all messaging is usually weaker."
        ],
        source: "manual-curated:social-media-strategies"
      },
      {
        q: "What should a strong strategy presentation to judges ultimately show?",
        options: [
          "That the recommendations are intentional, data-aware, and aligned to goals",
          "That the creator knows the names of many apps",
          "That posting more is always the answer",
          "That visuals matter more than outcomes"
        ],
        answer: 0,
        explain: "Judges should see clear reasoning, alignment, and evidence behind the strategy.",
        optionExplanations: [
          "Correct. Strong strategy is intentional and goal-aligned.",
          "Not correct. App familiarity alone is not strategy.",
          "Not correct. Volume without intent is weak.",
          "Not correct. Outcomes and reasoning matter more than appearance alone."
        ],
        source: "manual-curated:social-media-strategies"
      }
    ],
    "Business Plan": [
      {
        q: "What makes an executive summary strongest in a business plan presentation?",
        options: [
          "It repeats every paragraph in full detail",
          "It gives a concise overview of the opportunity, model, and traction",
          "It only discusses the logo design",
          "It avoids mentioning finances"
        ],
        answer: 1,
        explain: "A strong executive summary quickly communicates the venture's value and why judges should keep reading or listening.",
        optionExplanations: [
          "Not correct. The summary should be concise, not a full duplicate.",
          "Correct. It should briefly capture the business, market, and why it matters.",
          "Not correct. Branding can matter, but it is not the core purpose of the summary.",
          "Not correct. High-level financial viability is important."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "Which market analysis choice best strengthens a business plan?",
        options: [
          "Using only assumptions with no customer evidence",
          "Defining a target market and supporting it with research",
          "Saying the product is for everyone",
          "Avoiding competitor discussion"
        ],
        answer: 1,
        explain: "Judges look for evidence that the team understands its customer segment and market realities.",
        optionExplanations: [
          "Not correct. Unsupported assumptions weaken credibility.",
          "Correct. Clear targeting and research make the market case stronger.",
          "Not correct. Overly broad targeting usually signals weak strategy.",
          "Not correct. Competitor awareness is important."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "Why is a competitive analysis important in a business plan?",
        options: [
          "It shows how the business is differentiated from alternatives",
          "It replaces the need for a pricing strategy",
          "It guarantees there is no competition",
          "It only matters for large corporations"
        ],
        answer: 0,
        explain: "Competitive analysis helps show awareness of the landscape and how the venture can win.",
        optionExplanations: [
          "Correct. Differentiation is one of the main reasons to include competitor analysis.",
          "Not correct. Pricing still needs to be addressed directly.",
          "Not correct. Most worthwhile opportunities still have alternatives or substitutes.",
          "Not correct. It matters for startups too."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "Which financial measure is most useful for showing whether the business can sustain itself over time?",
        options: [
          "Projected cash flow",
          "Font choice",
          "Number of slide transitions",
          "Mission statement length"
        ],
        answer: 0,
        explain: "Cash flow shows whether money is available when needed, which is critical for survival.",
        optionExplanations: [
          "Correct. Cash flow is a core sustainability measure.",
          "Not correct. Design matters, but not for financial sustainability.",
          "Not correct. Transitions do not show viability.",
          "Not correct. Mission statement length is not a financial metric."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "If judges ask how the business will grow after launch, what are they testing most directly?",
        options: [
          "Scalability and growth strategy",
          "Whether the competitor memorized a script",
          "If the team can avoid all risk forever",
          "Whether the product can only serve one customer"
        ],
        answer: 0,
        explain: "Growth questions are usually probing whether the plan can scale realistically beyond the initial stage.",
        optionExplanations: [
          "Correct. Scalability is central to growth planning.",
          "Not correct. Memorization alone is not the point.",
          "Not correct. Judges expect risk management, not zero risk.",
          "Not correct. That would suggest weak growth potential."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "What is the best purpose of including a break-even estimate?",
        options: [
          "To show when revenue is expected to cover costs",
          "To prove the product needs no marketing",
          "To avoid discussing expenses",
          "To replace startup cost estimates"
        ],
        answer: 0,
        explain: "Break-even analysis helps judges understand when the business could become financially self-supporting.",
        optionExplanations: [
          "Correct. That is exactly what break-even indicates.",
          "Not correct. Marketing may still be essential.",
          "Not correct. Expenses are part of the analysis.",
          "Not correct. Startup cost estimates are still needed."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "Which response is strongest if a judge challenges an assumption in the plan?",
        options: [
          "Become defensive and dismiss the question",
          "Acknowledge the assumption and support it with reasoning or data",
          "Say the numbers do not matter",
          "Change the topic immediately"
        ],
        answer: 1,
        explain: "Business plan Q&A is partly about handling scrutiny with professionalism and evidence.",
        optionExplanations: [
          "Not correct. Defensiveness hurts credibility.",
          "Correct. Calm evidence-based answers are strongest.",
          "Not correct. Financial and strategic assumptions do matter.",
          "Not correct. Avoiding the question weakens the response."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "Which pricing explanation is most persuasive in a business plan?",
        options: [
          "The price was chosen at random",
          "The price reflects costs, customer value, and market positioning",
          "The price is high because high prices look impressive",
          "Pricing does not need to match the target customer"
        ],
        answer: 1,
        explain: "Strong pricing logic ties together economics, customer willingness to pay, and brand position.",
        optionExplanations: [
          "Not correct. Random pricing suggests weak planning.",
          "Correct. Good pricing should be strategic and evidence-based.",
          "Not correct. High price alone is not a strategy.",
          "Not correct. Pricing should fit the market."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "What strengthens the operations section of a business plan most?",
        options: [
          "A clear explanation of how the product or service will actually be delivered",
          "A longer title page",
          "Avoiding mention of suppliers or workflow",
          "Replacing process details with slogans"
        ],
        answer: 0,
        explain: "Operations show whether the idea can be executed, not just imagined.",
        optionExplanations: [
          "Correct. Delivery, workflow, and resource planning make the plan practical.",
          "Not correct. The title page is not the operational core.",
          "Not correct. Those are exactly the details judges need.",
          "Not correct. Slogans cannot replace execution detail."
        ],
        source: "manual-curated:business-plan"
      },
      {
        q: "What is the biggest risk of overloading a business plan presentation with text-heavy slides?",
        options: [
          "Judges may focus less on the key message and more on reading clutter",
          "It automatically improves clarity",
          "It guarantees better financial projections",
          "It removes the need for speaking skills"
        ],
        answer: 0,
        explain: "Text-heavy visuals often dilute the message and make delivery less effective.",
        optionExplanations: [
          "Correct. Dense slides reduce clarity and audience focus.",
          "Not correct. Overloaded slides usually hurt clarity.",
          "Not correct. Slide density does not improve projections.",
          "Not correct. Speaking skill is still essential."
        ],
        source: "manual-curated:business-plan"
      }
    ],
    "Career Portfolio": [
      {
        q: "What makes a career portfolio most effective for judges?",
        options: [
          "It is organized around evidence of growth, skills, and accomplishments",
          "It includes as many unrelated files as possible",
          "It focuses only on decorative backgrounds",
          "It avoids explaining why artifacts matter"
        ],
        answer: 0,
        explain: "A strong portfolio is curated, purposeful, and tied to the competitor's development and goals.",
        optionExplanations: [
          "Correct. Good portfolios tell a clear professional story with evidence.",
          "Not correct. More files does not mean better quality.",
          "Not correct. Design supports content, not vice versa.",
          "Not correct. Reflection and relevance matter."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "Which artifact adds the most value to a career portfolio?",
        options: [
          "An unlabeled screenshot with no explanation",
          "A work sample paired with a concise reflection on the skill it demonstrates",
          "A blank page for future use",
          "A meme unrelated to career goals"
        ],
        answer: 1,
        explain: "Artifacts are strongest when the competitor explains what they show and why they matter.",
        optionExplanations: [
          "Not correct. Unexplained evidence is harder for judges to interpret.",
          "Correct. Reflection turns an artifact into meaningful evidence.",
          "Not correct. That adds no evidence.",
          "Not correct. It is not professionally relevant."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "What is the best reason to include a resume in a career portfolio?",
        options: [
          "To summarize experience, skills, and achievements in a professional format",
          "To replace all portfolio artifacts",
          "To avoid discussing accomplishments verbally",
          "To add extra pages without purpose"
        ],
        answer: 0,
        explain: "The resume gives judges a quick high-level view of the competitor's background.",
        optionExplanations: [
          "Correct. A resume is a key summary document in a portfolio.",
          "Not correct. It complements rather than replaces artifacts.",
          "Not correct. Verbal explanation is still important.",
          "Not correct. Every item should have purpose."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "Which portfolio structure helps judges follow your story best?",
        options: [
          "Random file order",
          "A clear sequence such as profile, goals, evidence, reflection, and future plans",
          "No section labels",
          "A hidden navigation menu"
        ],
        answer: 1,
        explain: "Strong organization makes it easier for judges to see progression and purpose.",
        optionExplanations: [
          "Not correct. Random order weakens usability.",
          "Correct. Clear sequencing creates a stronger narrative.",
          "Not correct. Labels help navigation.",
          "Not correct. Usability should be simple and visible."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "What is the strongest way to discuss an accomplishment during the presentation?",
        options: [
          "Give a vague claim with no evidence",
          "Describe the accomplishment, your role, and the result or impact",
          "Rush past it to save time",
          "Let the judges guess why it matters"
        ],
        answer: 1,
        explain: "Judges respond best to specific accomplishments with clear ownership and outcomes.",
        optionExplanations: [
          "Not correct. Vague claims are less persuasive.",
          "Correct. Role plus result makes the evidence meaningful.",
          "Not correct. Important evidence deserves explanation.",
          "Not correct. The competitor should make the significance clear."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "Why should a digital portfolio be checked on multiple devices before competition?",
        options: [
          "To confirm links, layout, and media work reliably",
          "To make it look longer",
          "To avoid proofreading",
          "To guarantee all judges use the same browser"
        ],
        answer: 0,
        explain: "Technical reliability is part of professionalism in a portfolio event.",
        optionExplanations: [
          "Correct. Testing prevents avoidable technical issues during judging.",
          "Not correct. Length is not the goal.",
          "Not correct. Proofreading is still needed.",
          "Not correct. You cannot assume identical judge devices."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "What kind of personal statement is most useful in a career portfolio?",
        options: [
          "One that connects interests, strengths, and career direction clearly",
          "One filled with generic buzzwords only",
          "One unrelated to the portfolio content",
          "One copied from someone else's template without revision"
        ],
        answer: 0,
        explain: "A good personal statement helps the portfolio feel intentional and authentic.",
        optionExplanations: [
          "Correct. It should connect who you are with where you are headed.",
          "Not correct. Generic language weakens impact.",
          "Not correct. It should align with the portfolio.",
          "Not correct. Authenticity matters."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "Which design choice best supports a professional portfolio?",
        options: [
          "Consistent fonts, readable spacing, and clean navigation",
          "Multiple clashing color schemes on every page",
          "Dense paragraphs with no headings",
          "Autoplay audio on page load"
        ],
        answer: 0,
        explain: "Professional design makes the portfolio easier to review and more credible.",
        optionExplanations: [
          "Correct. Consistency and usability strengthen presentation quality.",
          "Not correct. Visual inconsistency is distracting.",
          "Not correct. Structure and scannability matter.",
          "Not correct. Unexpected media can distract judges."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "If a judge asks why a certain artifact was included, what is the strongest answer?",
        options: [
          "It filled space in the portfolio",
          "It demonstrates a specific skill, growth point, or achievement relevant to my goals",
          "I forgot to remove it",
          "Someone else told me to add it"
        ],
        answer: 1,
        explain: "Every portfolio artifact should have a defensible reason tied to growth or readiness.",
        optionExplanations: [
          "Not correct. Space-filling is not a valid reason.",
          "Correct. Purposeful selection is key.",
          "Not correct. That suggests weak preparation.",
          "Not correct. The competitor should own the portfolio choices."
        ],
        source: "manual-curated:career-portfolio"
      },
      {
        q: "What is the best final preparation step before a career portfolio presentation?",
        options: [
          "Practice navigating the portfolio while explaining key evidence out loud",
          "Change the theme at the last minute without checking readability",
          "Add extra pages with no explanation",
          "Memorize only the opening sentence"
        ],
        answer: 0,
        explain: "Presentation fluency and smooth navigation are both important in portfolio judging.",
        optionExplanations: [
          "Correct. Rehearsing the flow improves confidence and timing.",
          "Not correct. Last-minute design changes are risky.",
          "Not correct. Unexplained additions weaken focus.",
          "Not correct. The whole presentation needs preparation."
        ],
        source: "manual-curated:career-portfolio"
      }
    ],
    "Data Analysis": [
      {
        q: "What should come first in a strong data analysis presentation?",
        options: [
          "A clear problem statement or question being investigated",
          "A random chart with no context",
          "A long conclusion before any evidence",
          "Only the software name"
        ],
        answer: 0,
        explain: "Good analysis starts with a clear question so the methodology and results have purpose.",
        optionExplanations: [
          "Correct. The analysis should begin with the problem or objective.",
          "Not correct. Visuals need context.",
          "Not correct. Conclusions should come after evidence.",
          "Not correct. Tools matter less than the analytical reasoning."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "Why is data cleaning an important part of the analysis process?",
        options: [
          "It improves the reliability of the conclusions",
          "It guarantees the preferred result",
          "It removes the need for interpretation",
          "It only matters for very small datasets"
        ],
        answer: 0,
        explain: "Missing values, duplicates, and inconsistent formats can distort findings if not addressed.",
        optionExplanations: [
          "Correct. Clean data supports trustworthy analysis.",
          "Not correct. Cleaning should improve validity, not force an outcome.",
          "Not correct. Interpretation is still necessary.",
          "Not correct. Data quality matters at all scales."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "Which visualization is usually best for comparing values across categories?",
        options: [
          "Bar chart",
          "Scatter plot only",
          "Random color gradient",
          "Animation loop"
        ],
        answer: 0,
        explain: "Bar charts are typically effective for category comparison because the lengths are easy to compare.",
        optionExplanations: [
          "Correct. Bar charts are a common best choice for category comparisons.",
          "Not correct. Scatter plots are better for relationships between numeric variables.",
          "Not correct. Color alone is not a chart type.",
          "Not correct. Animation is not the core answer here."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "What does an outlier require from a strong analyst?",
        options: [
          "Immediate deletion without review",
          "Investigation to determine whether it is an error or meaningful signal",
          "Automatic use as the headline finding",
          "Ignoring it because it is inconvenient"
        ],
        answer: 1,
        explain: "Outliers can represent bad data or important insight, so they should be investigated thoughtfully.",
        optionExplanations: [
          "Not correct. Automatic deletion can hide important information.",
          "Correct. Analysts should evaluate the cause and relevance of outliers.",
          "Not correct. It may or may not deserve emphasis.",
          "Not correct. Ignoring it is poor analysis practice."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "What is the best reason to explain methodology during a presentation?",
        options: [
          "To show how the data was collected, prepared, and analyzed",
          "To avoid presenting findings",
          "To make the presentation longer without purpose",
          "To hide assumptions from judges"
        ],
        answer: 0,
        explain: "Methodology helps judges evaluate whether the analysis process is sound and credible.",
        optionExplanations: [
          "Correct. Transparent methodology builds trust in the results.",
          "Not correct. Findings still need to be presented clearly.",
          "Not correct. It should add substance, not filler.",
          "Not correct. Assumptions should be acknowledged, not hidden."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "If two variables tend to move together, what is the safest conclusion?",
        options: [
          "There may be correlation, but causation is not automatically proven",
          "One variable definitely caused the other",
          "The data must be wrong",
          "No explanation is needed"
        ],
        answer: 0,
        explain: "A strong analyst avoids claiming causation without evidence beyond correlation.",
        optionExplanations: [
          "Correct. Correlation does not automatically establish cause-and-effect.",
          "Not correct. That conclusion is too strong without more evidence.",
          "Not correct. Association does not mean the data is invalid.",
          "Not correct. Interpretation still matters."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "What makes a recommendation section strongest in a data analysis event?",
        options: [
          "It is directly supported by the findings",
          "It introduces a new unrelated opinion",
          "It repeats every chart title only",
          "It avoids any action steps"
        ],
        answer: 0,
        explain: "Recommendations should flow logically from the analysis rather than appearing disconnected.",
        optionExplanations: [
          "Correct. Evidence-backed recommendations are most persuasive.",
          "Not correct. Unrelated opinions weaken credibility.",
          "Not correct. Repetition is not synthesis.",
          "Not correct. Good recommendations usually imply action."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "Which presentation mistake most weakens a dashboard or chart slide?",
        options: [
          "Labeling axes and units clearly",
          "Using cluttered visuals with unclear titles and no takeaway",
          "Explaining the main insight aloud",
          "Highlighting the most important trend"
        ],
        answer: 1,
        explain: "Charts should help the audience understand the message quickly, not force them to decode clutter.",
        optionExplanations: [
          "Not correct. Clear labels are good practice.",
          "Correct. Unclear and cluttered visuals weaken analysis communication.",
          "Not correct. Verbal explanation is helpful.",
          "Not correct. Highlighting key insight is usually beneficial."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "What should an analyst do if the sample size is a major limitation?",
        options: [
          "Ignore it and present full certainty",
          "Acknowledge the limitation and explain how it affects confidence",
          "Hide the number of observations",
          "Replace the data with guesses"
        ],
        answer: 1,
        explain: "Strong analysis includes honest treatment of limitations and confidence level.",
        optionExplanations: [
          "Not correct. Overclaiming hurts credibility.",
          "Correct. Transparent limitations make the work more trustworthy.",
          "Not correct. Hiding context is a poor practice.",
          "Not correct. Guesses are not a valid substitute for data."
        ],
        source: "manual-curated:data-analysis"
      },
      {
        q: "What is the best final step before delivering a data analysis presentation?",
        options: [
          "Check that every visual supports the story and every claim matches the data",
          "Add extra charts that were never discussed",
          "Remove the conclusion slide",
          "Memorize definitions without reviewing the findings"
        ],
        answer: 0,
        explain: "Final review should focus on alignment between evidence, visuals, and conclusions.",
        optionExplanations: [
          "Correct. Consistency and support are essential.",
          "Not correct. Extra unused charts can create confusion.",
          "Not correct. The conclusion is important.",
          "Not correct. Findings review matters more than isolated memorization."
        ],
        source: "manual-curated:data-analysis"
      }
    ],
    "Graphic Design": [
      {
        q: "What is the main purpose of visual hierarchy in a graphic design piece?",
        options: [
          "To guide the viewer's attention in a deliberate order",
          "To make every element equally prominent",
          "To remove all white space",
          "To avoid using typography"
        ],
        answer: 0,
        explain: "Hierarchy helps the audience know what to notice first, second, and third.",
        optionExplanations: [
          "Correct. Hierarchy is about priority and readability.",
          "Not correct. Equal emphasis usually weakens communication.",
          "Not correct. White space can help hierarchy.",
          "Not correct. Typography is often part of hierarchy."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "Which typography choice is most professional in a design competition?",
        options: [
          "Using readable type with intentional contrast and consistency",
          "Using as many fonts as possible",
          "Making body text extremely small",
          "Choosing fonts randomly"
        ],
        answer: 0,
        explain: "Type should support readability, tone, and visual organization.",
        optionExplanations: [
          "Correct. Clear, intentional typography improves design quality.",
          "Not correct. Too many fonts usually create clutter.",
          "Not correct. Tiny text hurts usability.",
          "Not correct. Font choices should be strategic."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "Why is alignment important in graphic design?",
        options: [
          "It creates order and helps elements feel related",
          "It makes the design look accidental",
          "It only matters in text documents",
          "It replaces color choices"
        ],
        answer: 0,
        explain: "Good alignment gives a design structure and polish.",
        optionExplanations: [
          "Correct. Alignment creates cohesion and professionalism.",
          "Not correct. Poor alignment looks accidental; good alignment does the opposite.",
          "Not correct. Alignment matters in visual design broadly.",
          "Not correct. It is not a replacement for color decisions."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "Which color strategy best supports readability?",
        options: [
          "Strong contrast between text and background",
          "Light gray text on a white background",
          "Using every bright color equally",
          "Choosing colors without regard to audience"
        ],
        answer: 0,
        explain: "Contrast is one of the most important factors in readability and accessibility.",
        optionExplanations: [
          "Correct. High contrast generally improves readability.",
          "Not correct. Low contrast is hard to read.",
          "Not correct. Too many competing colors weaken clarity.",
          "Not correct. Audience and context matter."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "What is the best reason to use a grid when creating a design layout?",
        options: [
          "To organize spacing and create consistency",
          "To prevent any creativity",
          "To make all elements the same size automatically",
          "To avoid editing later"
        ],
        answer: 0,
        explain: "Grids help designers make clean layout decisions while still leaving room for creativity.",
        optionExplanations: [
          "Correct. Grids improve structure and consistency.",
          "Not correct. Grids guide creativity rather than prevent it.",
          "Not correct. Designers still make size decisions.",
          "Not correct. Revision is still part of the process."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "If a design must match a brand, what should guide the choices most?",
        options: [
          "The brand's established voice, colors, and visual identity",
          "Only the designer's favorite color",
          "Ignoring the target audience",
          "Changing the logo each time for variety"
        ],
        answer: 0,
        explain: "Brand consistency matters because the design should feel connected to the organization it represents.",
        optionExplanations: [
          "Correct. Brand standards should shape the design.",
          "Not correct. Personal preference alone is not the standard.",
          "Not correct. Audience fit is still important.",
          "Not correct. Inconsistent logos weaken brand identity."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "What is the biggest problem with overcrowding a design with too many elements?",
        options: [
          "It can reduce clarity and make the message harder to understand",
          "It always improves energy",
          "It guarantees stronger hierarchy",
          "It removes the need for editing"
        ],
        answer: 0,
        explain: "Strong design often depends on restraint and purposeful editing.",
        optionExplanations: [
          "Correct. Overcrowding often harms communication.",
          "Not correct. More energy is not guaranteed, and clarity may suffer.",
          "Not correct. Overcrowding usually weakens hierarchy.",
          "Not correct. Editing becomes more necessary, not less."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "Which explanation sounds strongest in a judge Q&A for a design decision?",
        options: [
          "I chose this layout and type treatment to improve readability for the target audience",
          "I used it because it looked random and interesting",
          "I did not think about the audience at all",
          "I made changes with no reason"
        ],
        answer: 0,
        explain: "Judges want intentional design rationale, not accidental choices.",
        optionExplanations: [
          "Correct. Purposeful, audience-aware reasoning is strongest.",
          "Not correct. Randomness is usually weaker than intentionality.",
          "Not correct. Audience awareness is central.",
          "Not correct. Design decisions should be defensible."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "What does effective use of white space usually do?",
        options: [
          "Improves balance and helps important elements stand out",
          "Means the design is unfinished by default",
          "Forces every area to be empty",
          "Eliminates the need for hierarchy"
        ],
        answer: 0,
        explain: "White space is an active design tool, not wasted space.",
        optionExplanations: [
          "Correct. White space helps create focus and breathing room.",
          "Not correct. White space can be highly intentional.",
          "Not correct. It should be balanced, not excessive everywhere.",
          "Not correct. Hierarchy still matters."
        ],
        source: "manual-curated:graphic-design"
      },
      {
        q: "What is the best final review step before submitting a graphic design entry?",
        options: [
          "Check alignment, spelling, export settings, and whether the design matches the brief",
          "Add extra effects without checking purpose",
          "Ignore any small text issues",
          "Remove all margins"
        ],
        answer: 0,
        explain: "Final quality control should catch both visual and production errors.",
        optionExplanations: [
          "Correct. Submission review should cover both design quality and technical accuracy.",
          "Not correct. Extra effects can create clutter.",
          "Not correct. Small text issues still matter.",
          "Not correct. Margins are often important."
        ],
        source: "manual-curated:graphic-design"
      }
    ],
    "Visual Design": [
      {
        q: "Which principle helps a design feel stable and intentional rather than chaotic?",
        options: [
          "Balance",
          "Random placement",
          "Uneven readability",
          "Ignoring spacing"
        ],
        answer: 0,
        explain: "Balance helps distribute visual weight so the piece feels controlled and readable.",
        optionExplanations: [
          "Correct. Balance is central to visual stability.",
          "Not correct. Random placement weakens structure.",
          "Not correct. Readability should be improved, not made uneven.",
          "Not correct. Spacing contributes to balance."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "Why is contrast important in visual design?",
        options: [
          "It helps separate elements and create emphasis",
          "It makes everything blend together",
          "It only matters in black-and-white designs",
          "It removes the need for hierarchy"
        ],
        answer: 0,
        explain: "Contrast can be created through color, size, shape, or value to improve clarity and emphasis.",
        optionExplanations: [
          "Correct. Contrast helps create focus and distinction.",
          "Not correct. Contrast is the opposite of blending everything together.",
          "Not correct. It matters in color design too.",
          "Not correct. Hierarchy still matters."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "Which choice best supports accessibility in a visual design piece?",
        options: [
          "Readable text and sufficient color contrast",
          "Tiny labels and low contrast",
          "Relying on color alone to communicate meaning",
          "Decorative motion with no purpose"
        ],
        answer: 0,
        explain: "Accessible design helps more users understand the content effectively.",
        optionExplanations: [
          "Correct. Accessibility begins with readability and usable contrast.",
          "Not correct. That creates usability barriers.",
          "Not correct. Meaning should not depend on color alone.",
          "Not correct. Motion should serve the design purpose."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "What is the strongest reason to limit the number of fonts in a design?",
        options: [
          "To preserve consistency and readability",
          "To make the design less professional",
          "To avoid hierarchy completely",
          "To prevent all creativity"
        ],
        answer: 0,
        explain: "A restrained type system usually feels more polished and easier to read.",
        optionExplanations: [
          "Correct. Too many fonts often create clutter and inconsistency.",
          "Not correct. The goal is professionalism.",
          "Not correct. Typography can support hierarchy.",
          "Not correct. Limits can strengthen design decisions."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "When preparing a design for print, why is it important to think about color mode?",
        options: [
          "Because print and screen output can reproduce color differently",
          "Because color mode only matters for audio files",
          "Because all devices show colors identically",
          "Because print projects never use color"
        ],
        answer: 0,
        explain: "Designers should understand the difference between screen and print color behavior.",
        optionExplanations: [
          "Correct. Color mode affects how the final piece appears.",
          "Not correct. Audio files are unrelated.",
          "Not correct. Devices and media vary.",
          "Not correct. Many print projects use color."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "Which design rationale is strongest when presenting to judges?",
        options: [
          "The layout choices support the message and target audience",
          "The design has no intended audience",
          "The choices were accidental",
          "The visuals matter more than communication"
        ],
        answer: 0,
        explain: "Judges want to see intentional decisions tied to communication goals.",
        optionExplanations: [
          "Correct. Message and audience should drive visual choices.",
          "Not correct. Audience awareness is essential.",
          "Not correct. Intentionality is important.",
          "Not correct. Communication is the point of design."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "What does repetition contribute to a visual design system?",
        options: [
          "Consistency and cohesion across elements",
          "Total randomness",
          "Automatic creativity loss",
          "An excuse to ignore alignment"
        ],
        answer: 0,
        explain: "Repeated visual patterns create unity and make designs feel more intentional.",
        optionExplanations: [
          "Correct. Repetition helps tie the design together.",
          "Not correct. Repetition is the opposite of randomness.",
          "Not correct. It can support creativity when used well.",
          "Not correct. Alignment still matters."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "If a design feels visually heavy on one side, what principle should be reconsidered first?",
        options: [
          "Balance",
          "File naming",
          "Audio mixing",
          "Spreadsheet formulas"
        ],
        answer: 0,
        explain: "Uneven visual weight usually points back to balance issues in the composition.",
        optionExplanations: [
          "Correct. Balance is the key principle here.",
          "Not correct. File naming is unrelated.",
          "Not correct. Audio mixing is not the issue.",
          "Not correct. Spreadsheet formulas do not apply."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "What is the biggest risk of decorating every area of a design equally?",
        options: [
          "The piece may lose focus because nothing stands out",
          "The hierarchy automatically improves",
          "The audience reads faster",
          "The message becomes clearer by default"
        ],
        answer: 0,
        explain: "When everything is emphasized, the audience has a harder time finding the main message.",
        optionExplanations: [
          "Correct. Equal emphasis often weakens focus.",
          "Not correct. Hierarchy usually suffers.",
          "Not correct. Clutter can slow comprehension.",
          "Not correct. Clarity is not automatic."
        ],
        source: "manual-curated:visual-design"
      },
      {
        q: "What is the best final preparation move before submitting a visual design project?",
        options: [
          "Review the brief, proofread all text, and verify export specs",
          "Change the concept completely at the last minute",
          "Ignore any readability issues",
          "Flatten the design without checking quality"
        ],
        answer: 0,
        explain: "The last review should make sure the design solves the prompt and is technically submission-ready.",
        optionExplanations: [
          "Correct. Final quality control prevents avoidable mistakes.",
          "Not correct. Late concept changes are risky.",
          "Not correct. Readability is critical.",
          "Not correct. Export quality should be checked carefully."
        ],
        source: "manual-curated:visual-design"
      }
    ],
    "Website Coding & Development": [
      {
        q: "Which HTML choice is best for a primary page heading?",
        options: [
          "A semantic h1 element",
          "A div styled to look large with no heading tag",
          "Only a footer tag",
          "A hidden comment"
        ],
        answer: 0,
        explain: "Semantic structure improves accessibility, maintainability, and page organization.",
        optionExplanations: [
          "Correct. h1 is the proper semantic heading element.",
          "Not correct. Visual appearance alone is not enough.",
          "Not correct. The footer is not the main heading.",
          "Not correct. Comments are not visible page structure."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "What is the biggest reason responsive design matters in a website competition?",
        options: [
          "The site should function well across screen sizes and devices",
          "It lets designers skip testing",
          "It means only mobile users matter",
          "It replaces accessibility work"
        ],
        answer: 0,
        explain: "A strong entry should be usable on desktop and mobile, not just one fixed layout.",
        optionExplanations: [
          "Correct. Responsive design is about adaptable usability.",
          "Not correct. Testing is still necessary.",
          "Not correct. Multiple device contexts matter.",
          "Not correct. Accessibility is still separate and important."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "Which practice best improves website accessibility?",
        options: [
          "Providing meaningful alt text for informative images",
          "Putting essential text only inside images",
          "Using very low color contrast",
          "Removing keyboard focus indicators"
        ],
        answer: 0,
        explain: "Accessible websites make content available to more users, including those using assistive technology.",
        optionExplanations: [
          "Correct. Alt text is an important accessibility practice.",
          "Not correct. Text embedded only in images can create barriers.",
          "Not correct. Low contrast hurts readability.",
          "Not correct. Focus indicators help keyboard users."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "What is the best reason to separate HTML, CSS, and JavaScript logically?",
        options: [
          "It improves maintainability and keeps responsibilities clearer",
          "It guarantees there will be no bugs",
          "It makes the site impossible to update",
          "It removes the need for planning"
        ],
        answer: 0,
        explain: "Clear separation of concerns makes a project easier to build, debug, and improve.",
        optionExplanations: [
          "Correct. Separation supports cleaner development workflow.",
          "Not correct. Good structure helps, but bugs can still happen.",
          "Not correct. It should make updating easier.",
          "Not correct. Planning still matters."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "Which testing step is most important before submitting a website project?",
        options: [
          "Checking navigation, forms, layout, and links in the browser",
          "Assuming everything works because the homepage loads",
          "Changing colors without reviewing functionality",
          "Removing error handling to simplify code"
        ],
        answer: 0,
        explain: "Functional testing should cover the actual user flows, not just whether the page opens.",
        optionExplanations: [
          "Correct. Submission review should verify the key site behaviors.",
          "Not correct. One successful page load is not enough.",
          "Not correct. Functionality review matters more.",
          "Not correct. Error handling is often useful."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "Why is page performance important in a web event?",
        options: [
          "Slow pages can hurt usability and overall polish",
          "Performance only matters after the competition",
          "Fast sites never need design quality",
          "It only affects developers, not users"
        ],
        answer: 0,
        explain: "Performance is part of user experience, especially when judges are evaluating responsiveness and polish.",
        optionExplanations: [
          "Correct. Performance contributes directly to usability.",
          "Not correct. It matters during judging too.",
          "Not correct. Performance and design both matter.",
          "Not correct. Users definitely feel performance issues."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "What is the best use of version control in a website project?",
        options: [
          "Tracking changes and making collaboration safer",
          "Replacing all testing",
          "Guaranteeing perfect design decisions",
          "Eliminating the need for backups or planning"
        ],
        answer: 0,
        explain: "Version control helps teams manage iterations and recover from mistakes more safely.",
        optionExplanations: [
          "Correct. Tracking changes is one of the main benefits of version control.",
          "Not correct. Testing is still required.",
          "Not correct. Design judgment still matters.",
          "Not correct. Good workflow still needs planning."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "Which CSS approach usually helps create a more maintainable interface?",
        options: [
          "Consistent class naming and reusable patterns",
          "Inline styles on every element only",
          "Random naming with no structure",
          "Repeating the same declarations everywhere"
        ],
        answer: 0,
        explain: "Reusable, consistent styling is easier to maintain and update.",
        optionExplanations: [
          "Correct. Structured CSS scales better than scattered overrides.",
          "Not correct. Inline-only styling is harder to maintain.",
          "Not correct. Random structure increases confusion.",
          "Not correct. Repetition makes maintenance harder."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "What is the strongest reason to include semantic landmarks like nav, main, and footer?",
        options: [
          "They improve document structure and help accessibility tools interpret the page",
          "They make JavaScript unnecessary",
          "They automatically optimize every image",
          "They replace visual design"
        ],
        answer: 0,
        explain: "Semantic landmarks help both maintainers and assistive technologies understand page structure.",
        optionExplanations: [
          "Correct. Landmarks improve structural meaning.",
          "Not correct. JavaScript may still be needed.",
          "Not correct. Image optimization is separate.",
          "Not correct. Visual design still matters."
        ],
        source: "manual-curated:website-coding-and-development"
      },
      {
        q: "What is the best final submission check for a website coding event?",
        options: [
          "Verify the site matches the prompt, works end to end, and is polished on real screens",
          "Add last-minute features without testing",
          "Delete comments and documentation blindly",
          "Assume judges will understand unfinished areas"
        ],
        answer: 0,
        explain: "Final review should confirm both requirements and user experience quality.",
        optionExplanations: [
          "Correct. Working, complete, polished execution is the goal.",
          "Not correct. Untested changes are risky.",
          "Not correct. Blind cleanup can remove useful context.",
          "Not correct. Unfinished work should not be assumed away."
        ],
        source: "manual-curated:website-coding-and-development"
      }
    ],
    "Coding & Programming": [
      {
        q: "What is the strongest first step when beginning a coding competition project?",
        options: [
          "Clarify the requirements and success criteria",
          "Start styling before reading the prompt",
          "Skip planning and code randomly",
          "Ignore edge cases until judging"
        ],
        answer: 0,
        explain: "Good implementation starts with understanding the required features, constraints, and evaluation criteria.",
        optionExplanations: [
          "Correct. Requirements should guide all technical decisions.",
          "Not correct. Styling before understanding the task is risky.",
          "Not correct. Unplanned coding leads to avoidable mistakes.",
          "Not correct. Edge cases often matter in judging."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "Why is modular code valuable in a programming event?",
        options: [
          "It makes the solution easier to test, debug, and maintain",
          "It guarantees zero bugs",
          "It removes the need for documentation",
          "It only matters for very large companies"
        ],
        answer: 0,
        explain: "Breaking a project into clear components helps competitors reason about the system more effectively.",
        optionExplanations: [
          "Correct. Modularity improves maintainability and clarity.",
          "Not correct. Good structure helps, but does not eliminate bugs.",
          "Not correct. Clear explanation may still be needed.",
          "Not correct. It matters in competition projects too."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "What is the best reason to test edge cases before submission?",
        options: [
          "They often reveal bugs not seen in normal inputs",
          "They make the code longer",
          "They are only useful after judging",
          "They replace normal functional testing"
        ],
        answer: 0,
        explain: "Edge-case testing catches boundary issues that can break an otherwise solid demo.",
        optionExplanations: [
          "Correct. Edge cases help uncover hidden defects.",
          "Not correct. Longer code is not the point.",
          "Not correct. They matter before submission.",
          "Not correct. Both normal and edge-case testing matter."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "Which explanation is strongest when presenting your code to judges?",
        options: [
          "How the design choices solve the problem and support maintainability",
          "That the code was written quickly",
          "That comments were skipped to save time",
          "That the interface matters more than functionality"
        ],
        answer: 0,
        explain: "Judges respond well to thoughtful technical reasoning, not just speed.",
        optionExplanations: [
          "Correct. Design rationale shows engineering maturity.",
          "Not correct. Speed alone is not a quality argument.",
          "Not correct. Clarity still matters.",
          "Not correct. Functionality is essential."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "What is the best use of version control during a coding project?",
        options: [
          "Track changes safely and support collaboration",
          "Replace all backups and testing",
          "Guarantee the final app is perfect",
          "Avoid documenting progress"
        ],
        answer: 0,
        explain: "Version control supports safer iteration and team workflow.",
        optionExplanations: [
          "Correct. It helps teams manage change effectively.",
          "Not correct. Testing still matters.",
          "Not correct. No tool guarantees perfection.",
          "Not correct. Documentation can still help."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "Why is input validation important in an application?",
        options: [
          "It helps prevent errors and handles invalid user data gracefully",
          "It makes the interface less user-friendly by default",
          "It only matters in database systems",
          "It removes the need for testing"
        ],
        answer: 0,
        explain: "Validating inputs improves reliability and reduces avoidable failure states.",
        optionExplanations: [
          "Correct. Strong validation supports stability and usability.",
          "Not correct. Good validation usually improves the experience.",
          "Not correct. It matters across many app types.",
          "Not correct. Testing is still required."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "What makes documentation most useful in a competition project?",
        options: [
          "It clearly explains setup, purpose, and key implementation details",
          "It repeats the entire codebase line by line",
          "It focuses only on visual design",
          "It is hidden from judges"
        ],
        answer: 0,
        explain: "Clear documentation helps judges understand what the project does and how to evaluate it.",
        optionExplanations: [
          "Correct. Good docs are clear, concise, and practical.",
          "Not correct. Over-documenting every line is not necessary.",
          "Not correct. Technical context matters too.",
          "Not correct. Documentation should be accessible."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "If a bug appears during demo prep, what is the strongest response?",
        options: [
          "Reproduce it, isolate the cause, and fix or mitigate it deliberately",
          "Pretend it does not exist",
          "Rewrite the entire project immediately",
          "Blame the tools without investigating"
        ],
        answer: 0,
        explain: "Structured debugging is usually faster and more reliable than panicked rewrites.",
        optionExplanations: [
          "Correct. Calm debugging is the strongest response.",
          "Not correct. Hidden bugs can surface during judging.",
          "Not correct. Full rewrites are often risky.",
          "Not correct. Investigation should come first."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "What is the main benefit of separating business logic from presentation logic?",
        options: [
          "It makes the project easier to maintain and evolve",
          "It guarantees the UI will look better",
          "It removes the need for user testing",
          "It only matters for enterprise systems"
        ],
        answer: 0,
        explain: "Separation of concerns helps keep code easier to reason about and update.",
        optionExplanations: [
          "Correct. Clear boundaries improve maintainability.",
          "Not correct. Visual quality depends on design choices too.",
          "Not correct. User testing can still be valuable.",
          "Not correct. It matters at competition scale too."
        ],
        source: "manual-curated:coding-and-programming"
      },
      {
        q: "What is the best final check before submitting a coding event project?",
        options: [
          "Verify all required features work and the demo flow is reliable",
          "Add untested features at the last minute",
          "Remove all explanatory notes without review",
          "Assume judges will fill in missing functionality mentally"
        ],
        answer: 0,
        explain: "Completeness and reliability matter more than risky last-minute additions.",
        optionExplanations: [
          "Correct. Final review should focus on requirements and stability.",
          "Not correct. Untested additions often create problems.",
          "Not correct. Useful explanation should be reviewed, not blindly removed.",
          "Not correct. Missing functionality should not be assumed away."
        ],
        source: "manual-curated:coding-and-programming"
      }
    ],
    "Computer Game & Simulation Programming": [
      {
        q: "What is the strongest starting point for a game or simulation concept?",
        options: [
          "A clear core objective and user experience goal",
          "Random mechanics with no purpose",
          "Only visual effects and no gameplay loop",
          "Ignoring the prompt constraints"
        ],
        answer: 0,
        explain: "A defined gameplay or simulation goal helps every later design choice stay aligned.",
        optionExplanations: [
          "Correct. The core loop should be clear from the start.",
          "Not correct. Random mechanics weaken cohesion.",
          "Not correct. Visuals do not replace a working interaction model.",
          "Not correct. Constraints still matter."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "Why is a game loop important in interactive programming?",
        options: [
          "It updates state, input, and output continuously during play",
          "It replaces all planning",
          "It only matters in non-interactive apps",
          "It prevents the need for debugging"
        ],
        answer: 0,
        explain: "The game loop is the foundation for ongoing interaction and state changes.",
        optionExplanations: [
          "Correct. Input, logic, and rendering typically depend on the loop.",
          "Not correct. Planning still matters.",
          "Not correct. It is especially important in interactive apps.",
          "Not correct. Debugging is still required."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "What makes controls strongest in a playable prototype?",
        options: [
          "They are responsive, consistent, and easy to learn",
          "They change unpredictably",
          "They require a long manual for basic use",
          "They prioritize complexity over usability"
        ],
        answer: 0,
        explain: "Playability depends heavily on intuitive and reliable controls.",
        optionExplanations: [
          "Correct. Responsive controls improve the experience immediately.",
          "Not correct. Unpredictability frustrates users.",
          "Not correct. Basic interaction should be intuitive.",
          "Not correct. Usability matters more than unnecessary complexity."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "Which balancing choice usually improves a game or simulation most?",
        options: [
          "Adjusting difficulty so challenge feels fair and intentional",
          "Making success impossible",
          "Removing all feedback",
          "Letting one strategy trivialize the experience"
        ],
        answer: 0,
        explain: "Balanced challenge helps the experience feel engaging instead of frustrating or trivial.",
        optionExplanations: [
          "Correct. Balance shapes how satisfying the experience feels.",
          "Not correct. Extreme difficulty often hurts playability.",
          "Not correct. Feedback is important.",
          "Not correct. Dominant strategies can flatten gameplay."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "Why is user feedback important in a game or simulation interface?",
        options: [
          "It helps players understand what their actions caused",
          "It makes the design less clear",
          "It only matters in turn-based games",
          "It can replace all instructions"
        ],
        answer: 0,
        explain: "Visual, audio, or motion feedback helps users understand state changes and outcomes.",
        optionExplanations: [
          "Correct. Feedback strengthens usability and engagement.",
          "Not correct. Good feedback increases clarity.",
          "Not correct. It matters broadly across interactive genres.",
          "Not correct. Some instructions may still be needed."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "What is the best reason to test a game with real users before submission?",
        options: [
          "They can reveal confusion, difficulty spikes, or unclear mechanics",
          "They guarantee a perfect score",
          "They remove the need for developer judgment",
          "They only matter after release"
        ],
        answer: 0,
        explain: "Real users quickly expose usability problems the creators may miss.",
        optionExplanations: [
          "Correct. Playtesting is one of the most useful quality checks.",
          "Not correct. No test guarantees scores.",
          "Not correct. Developer judgment still matters.",
          "Not correct. It matters before submission too."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "What makes a simulation more credible?",
        options: [
          "Rules and outcomes that behave consistently and logically",
          "Random outputs with no model behind them",
          "Ignoring the scenario being modeled",
          "Only focusing on menu design"
        ],
        answer: 0,
        explain: "A simulation should reflect a coherent system rather than arbitrary behavior.",
        optionExplanations: [
          "Correct. Consistent rules make the model believable.",
          "Not correct. Arbitrary behavior weakens the simulation.",
          "Not correct. The modeled scenario matters.",
          "Not correct. Menus are secondary to system behavior."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "What is the strongest demo strategy for a game or simulation project?",
        options: [
          "Show the core loop clearly and explain the most important design choices",
          "Spend all the time in the settings menu",
          "Hide unfinished issues and hope they are not noticed",
          "Talk about ideas without showing the build"
        ],
        answer: 0,
        explain: "Judges need to see the core interaction working and understand the reasoning behind it.",
        optionExplanations: [
          "Correct. A focused demo highlights the strongest parts of the project.",
          "Not correct. That avoids the main value of the project.",
          "Not correct. Honest preparation is stronger than concealment.",
          "Not correct. Showing the build matters."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "Why should performance be monitored in a game project?",
        options: [
          "Lag or instability can make the experience feel broken",
          "Performance never affects judging",
          "Only art style matters in games",
          "Optimization should happen only after the event"
        ],
        answer: 0,
        explain: "Interactive projects need reasonable responsiveness to feel polished.",
        optionExplanations: [
          "Correct. Performance contributes directly to usability.",
          "Not correct. It can absolutely affect judging.",
          "Not correct. Functionality and polish both matter.",
          "Not correct. Some optimization before submission is important."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      },
      {
        q: "What is the best final submission check for a game or simulation event?",
        options: [
          "Verify the build runs reliably and the primary interactions work end to end",
          "Add new mechanics without testing them",
          "Assume judges will ignore crashes",
          "Remove instructions even if the interface is unclear"
        ],
        answer: 0,
        explain: "The final build should be stable enough to demonstrate the intended experience clearly.",
        optionExplanations: [
          "Correct. Stability and core functionality should come first.",
          "Not correct. Untested additions are risky.",
          "Not correct. Crashes are serious issues.",
          "Not correct. Clarity still matters."
        ],
        source: "manual-curated:computer-game-and-simulation-programming"
      }
    ],
    "Digital Animation": [
      {
        q: "What makes an animation concept strongest before production begins?",
        options: [
          "A clear message, audience, and visual direction",
          "Starting random scenes with no plan",
          "Ignoring timing and pacing",
          "Only choosing software without a concept"
        ],
        answer: 0,
        explain: "Pre-production clarity helps the animation feel intentional instead of disconnected.",
        optionExplanations: [
          "Correct. Purpose and audience should shape the piece.",
          "Not correct. Random scenes usually weaken the result.",
          "Not correct. Timing matters greatly in animation.",
          "Not correct. Tools do not replace concept."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "Why is storyboarding useful in animation?",
        options: [
          "It helps plan sequence, shots, and pacing before full production",
          "It replaces all editing",
          "It only matters in live-action video",
          "It guarantees perfect rendering"
        ],
        answer: 0,
        explain: "Storyboards make it easier to test ideas and structure before spending time animating them fully.",
        optionExplanations: [
          "Correct. Storyboarding supports efficient planning.",
          "Not correct. Editing is still needed.",
          "Not correct. It is valuable in animation too.",
          "Not correct. Rendering quality is separate."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "What is the main purpose of easing in animation?",
        options: [
          "To make motion feel more natural and less robotic",
          "To remove all timing variation",
          "To make every movement happen instantly",
          "To avoid keyframes"
        ],
        answer: 0,
        explain: "Easing helps motion accelerate and decelerate in a more believable way.",
        optionExplanations: [
          "Correct. Easing improves realism and polish.",
          "Not correct. Variation in timing is often useful.",
          "Not correct. Instant motion often feels unnatural.",
          "Not correct. Keyframes are still commonly used."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "Why is consistent visual style important in an animation project?",
        options: [
          "It helps the piece feel cohesive and intentional",
          "It makes revision impossible",
          "It only matters for logos",
          "It replaces narrative structure"
        ],
        answer: 0,
        explain: "Consistent design choices help the audience stay focused on the message and story.",
        optionExplanations: [
          "Correct. Cohesion strengthens the overall experience.",
          "Not correct. Revision is still possible.",
          "Not correct. Style matters across the whole piece.",
          "Not correct. Story structure still matters."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "What is the biggest risk of adding too many effects to an animation?",
        options: [
          "The message can become less clear and the piece can feel cluttered",
          "It always improves professionalism",
          "It guarantees smoother timing",
          "It removes the need for audio"
        ],
        answer: 0,
        explain: "Effects should support the communication goal, not distract from it.",
        optionExplanations: [
          "Correct. Overuse can hurt clarity.",
          "Not correct. More effects do not automatically improve quality.",
          "Not correct. Timing still requires deliberate work.",
          "Not correct. Audio decisions are separate."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "What should timing and pacing accomplish in a strong animation?",
        options: [
          "Support the mood, emphasis, and understandability of the piece",
          "Make every scene the same length regardless of importance",
          "Confuse the audience intentionally",
          "Replace transitions completely"
        ],
        answer: 0,
        explain: "Pacing shapes how the audience experiences emphasis, energy, and clarity.",
        optionExplanations: [
          "Correct. Timing should reinforce the message and feel of the piece.",
          "Not correct. Uniform timing is not always effective.",
          "Not correct. Confusion is not the goal.",
          "Not correct. Transitions may still matter."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "Why is audio review important before submitting an animation?",
        options: [
          "Poor levels or mismatched sound can weaken the whole presentation",
          "Audio never affects the viewer experience",
          "It only matters if there is dialogue",
          "Visuals make sound irrelevant"
        ],
        answer: 0,
        explain: "Audio quality strongly affects how polished and professional the final piece feels.",
        optionExplanations: [
          "Correct. Sound design and levels matter.",
          "Not correct. Audio can affect impact a lot.",
          "Not correct. Music and effects matter too.",
          "Not correct. Sound can meaningfully shape the experience."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "What is the strongest way to explain an animation choice to judges?",
        options: [
          "Connect the motion or style choice to the intended message and audience",
          "Say it was completely random",
          "Claim the software made all decisions",
          "Avoid giving any rationale"
        ],
        answer: 0,
        explain: "Judges want to see intentional creative decision-making, not accidental outcomes.",
        optionExplanations: [
          "Correct. Strong rationale ties design to communication goals.",
          "Not correct. Randomness is usually a weak explanation.",
          "Not correct. The creator's judgment still matters.",
          "Not correct. Explanation is often part of scoring."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "What is a good reason to render short test exports during production?",
        options: [
          "To catch quality, timing, or playback issues before final export",
          "To avoid reviewing the project",
          "To eliminate the need for storyboards",
          "To change the concept entirely"
        ],
        answer: 0,
        explain: "Test exports reveal issues that may not be obvious while editing inside the software.",
        optionExplanations: [
          "Correct. Early testing prevents unpleasant surprises at the end.",
          "Not correct. Review is still needed.",
          "Not correct. Storyboards serve a different purpose.",
          "Not correct. Test exports are for verification, not random pivots."
        ],
        source: "manual-curated:digital-animation"
      },
      {
        q: "What is the best final submission check for a digital animation project?",
        options: [
          "Verify the exported file plays correctly and matches the prompt's requirements",
          "Submit the first draft without watching it",
          "Ignore any spelling errors in titles or captions",
          "Assume judges can imagine missing scenes"
        ],
        answer: 0,
        explain: "Final review should confirm both technical playback and prompt alignment.",
        optionExplanations: [
          "Correct. Export validation is essential.",
          "Not correct. Final review should never be skipped.",
          "Not correct. Text quality still matters.",
          "Not correct. Missing content should be fixed, not assumed away."
        ],
        source: "manual-curated:digital-animation"
      }
    ],
    "Digital Video Production": [
      {
        q: "What should guide shot selection in a video project most?",
        options: [
          "The story, message, and audience needs",
          "Random camera angles only",
          "Using every effect available",
          "Ignoring continuity"
        ],
        answer: 0,
        explain: "Every shot should help communicate the intended story or message more clearly.",
        optionExplanations: [
          "Correct. Shot choices should support communication goals.",
          "Not correct. Randomness weakens storytelling.",
          "Not correct. Effects are secondary to story.",
          "Not correct. Continuity matters."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "Why is continuity important in edited video?",
        options: [
          "It helps the sequence feel coherent and easier to follow",
          "It only matters in documentaries",
          "It replaces audio clarity",
          "It makes jump cuts impossible by definition"
        ],
        answer: 0,
        explain: "Continuity helps viewers stay engaged without being distracted by avoidable inconsistencies.",
        optionExplanations: [
          "Correct. Continuity supports clarity and immersion.",
          "Not correct. It matters across many types of video.",
          "Not correct. Audio is still important.",
          "Not correct. It does not make all jump cuts impossible."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "What is the strongest reason to capture B-roll?",
        options: [
          "It provides supporting visuals that improve pacing and storytelling",
          "It replaces all primary footage",
          "It makes planning unnecessary",
          "It only matters in sports videos"
        ],
        answer: 0,
        explain: "B-roll helps editors cover cuts, reinforce ideas, and add context.",
        optionExplanations: [
          "Correct. Supporting footage often strengthens the final piece significantly.",
          "Not correct. It complements, not replaces, primary footage.",
          "Not correct. Planning is still needed.",
          "Not correct. B-roll is useful in many genres."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "Why is audio quality often a deciding factor in video quality?",
        options: [
          "Poor sound can make even strong visuals feel unprofessional",
          "Audio never matters if the visuals are good",
          "Viewers do not notice bad levels",
          "Music automatically fixes dialogue issues"
        ],
        answer: 0,
        explain: "Clear dialogue and controlled levels are central to perceived production quality.",
        optionExplanations: [
          "Correct. Sound quality heavily affects the experience.",
          "Not correct. Audio problems are very noticeable.",
          "Not correct. Viewers often notice them quickly.",
          "Not correct. Music does not solve core dialogue problems."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "What is the purpose of a rough cut?",
        options: [
          "To establish the structure and major content before fine editing",
          "To finalize export settings immediately",
          "To avoid revisions later",
          "To color grade before assembling the story"
        ],
        answer: 0,
        explain: "Rough cuts help editors shape the story before polishing details.",
        optionExplanations: [
          "Correct. Structure comes before fine polish.",
          "Not correct. Export settings come later.",
          "Not correct. Revision is still part of editing.",
          "Not correct. Story assembly usually comes first."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "What makes a title card or caption effective in a video project?",
        options: [
          "Readable timing, clear wording, and visual consistency",
          "Tiny unreadable text",
          "A different font on every screen",
          "Covering key action with text"
        ],
        answer: 0,
        explain: "On-screen text should support comprehension without distracting from the footage.",
        optionExplanations: [
          "Correct. Readability and consistency matter.",
          "Not correct. Small unreadable text hurts communication.",
          "Not correct. Inconsistent typography weakens polish.",
          "Not correct. Text should avoid interfering with the content."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "Why should video pacing be reviewed before final export?",
        options: [
          "The editor needs to check whether scenes hold attention and support the message",
          "Every scene should be the same length no matter what",
          "Pacing does not affect engagement",
          "Transitions alone solve pacing problems"
        ],
        answer: 0,
        explain: "Pacing shapes attention, emotion, and overall clarity.",
        optionExplanations: [
          "Correct. Good pacing helps the story land effectively.",
          "Not correct. Scene length should serve the story.",
          "Not correct. Engagement is strongly affected by pacing.",
          "Not correct. Transitions alone are not enough."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "What is the strongest explanation for a cut or transition choice in judge Q&A?",
        options: [
          "It improved clarity, tone, or flow for the viewer",
          "It was random and looked busy",
          "The editor clicked it by accident",
          "Transitions never need a reason"
        ],
        answer: 0,
        explain: "Intentional editing choices are stronger than accidental or purely decorative ones.",
        optionExplanations: [
          "Correct. Good editors can justify their decisions in audience terms.",
          "Not correct. Randomness is a weak rationale.",
          "Not correct. Accidental choices are not strong evidence of craft.",
          "Not correct. Judges often want rationale."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "What is the value of checking export settings before submission?",
        options: [
          "It helps prevent playback, resolution, or compatibility problems",
          "It only matters after the event",
          "It changes the story automatically",
          "It replaces proofreading and content review"
        ],
        answer: 0,
        explain: "Technical export mistakes can undermine otherwise strong creative work.",
        optionExplanations: [
          "Correct. Export settings directly affect deliverability.",
          "Not correct. It matters before submission.",
          "Not correct. Story quality is separate.",
          "Not correct. Content review is still needed."
        ],
        source: "manual-curated:digital-video-production"
      },
      {
        q: "What is the best final check before submitting a video production entry?",
        options: [
          "Watch the entire exported video from start to finish",
          "Assume the timeline preview guarantees the export is fine",
          "Skip review if rendering took a long time",
          "Ignore any last-second glitches"
        ],
        answer: 0,
        explain: "The final exported file is what judges see, so it should be reviewed directly.",
        optionExplanations: [
          "Correct. Full playback review catches issues that previews may miss.",
          "Not correct. Exported output can differ from the timeline preview.",
          "Not correct. Rendering time is not a reason to skip review.",
          "Not correct. Glitches should be addressed if possible."
        ],
        source: "manual-curated:digital-video-production"
      }
    ],
    "Event Planning": [
      {
        q: "What is the best starting point for a strong event plan?",
        options: [
          "A clear objective, audience, and scope",
          "Choosing decorations before defining the purpose",
          "Ignoring the budget",
          "Planning without a timeline"
        ],
        answer: 0,
        explain: "The event's goals and audience should shape every later decision.",
        optionExplanations: [
          "Correct. Clear purpose and scope create a stronger plan.",
          "Not correct. Style should follow strategy.",
          "Not correct. Budget matters early.",
          "Not correct. Timelines are essential."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "Why is a budget important in event planning?",
        options: [
          "It helps balance priorities and keep the plan realistic",
          "It only matters after the event ends",
          "It replaces the need for vendor coordination",
          "It guarantees sponsors"
        ],
        answer: 0,
        explain: "Strong planners show they can align ideas with financial constraints.",
        optionExplanations: [
          "Correct. Budgeting keeps the plan practical.",
          "Not correct. It matters throughout planning.",
          "Not correct. Vendor management is still required.",
          "Not correct. Budgets do not guarantee sponsorship."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "What is the strongest reason to build a detailed event timeline?",
        options: [
          "It coordinates tasks, deadlines, and day-of execution",
          "It makes communication unnecessary",
          "It only matters for very large conferences",
          "It replaces contingency planning"
        ],
        answer: 0,
        explain: "Timelines keep planning organized and reduce avoidable failures.",
        optionExplanations: [
          "Correct. Good scheduling supports reliable execution.",
          "Not correct. Communication is still important.",
          "Not correct. Timelines matter at many scales.",
          "Not correct. Backup plans are still needed."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "Why should contingency plans be part of an event proposal?",
        options: [
          "They show the planner is prepared for likely risks or disruptions",
          "They make the original plan irrelevant",
          "They only matter for outdoor events",
          "They eliminate all uncertainty"
        ],
        answer: 0,
        explain: "Judges want to see that the competitor can anticipate and manage problems, not just ideal conditions.",
        optionExplanations: [
          "Correct. Backup planning is part of strong event management.",
          "Not correct. The main plan still matters.",
          "Not correct. Risks exist in many event types.",
          "Not correct. Contingencies reduce risk but do not eliminate it."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "What is the best way to choose a venue for an event?",
        options: [
          "Match the venue to capacity, logistics, budget, and attendee experience",
          "Choose only the cheapest option no matter what",
          "Ignore location and accessibility",
          "Pick the venue with the best photos only"
        ],
        answer: 0,
        explain: "Venue choice should reflect practical fit, not just appearance.",
        optionExplanations: [
          "Correct. Good venues fit operational and audience needs.",
          "Not correct. Cost matters, but not alone.",
          "Not correct. Accessibility and location are important.",
          "Not correct. Photos do not prove operational fit."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "What makes a vendor management plan stronger?",
        options: [
          "Clear expectations, deadlines, and communication points",
          "Verbal assumptions with no documentation",
          "Waiting until the event day to confirm details",
          "Treating every vendor the same regardless of role"
        ],
        answer: 0,
        explain: "Reliable events depend on proactive coordination and clearly defined responsibilities.",
        optionExplanations: [
          "Correct. Clear coordination reduces errors.",
          "Not correct. Documentation helps avoid confusion.",
          "Not correct. Late confirmation is risky.",
          "Not correct. Different vendors often need tailored coordination."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "Which metric would best help evaluate event success?",
        options: [
          "Measures tied to goals, such as attendance, satisfaction, or conversion",
          "Only the amount of confetti used",
          "Random observations with no connection to objectives",
          "A guess made before the event"
        ],
        answer: 0,
        explain: "Evaluation should connect back to the event's intended outcomes.",
        optionExplanations: [
          "Correct. Strong metrics reflect the event goals.",
          "Not correct. That is not a meaningful KPI.",
          "Not correct. Evaluation should be purposeful.",
          "Not correct. Evidence matters more than guessing."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "What is the strongest answer if a judge asks how you would promote the event?",
        options: [
          "Describe channels and tactics that fit the target audience",
          "Say marketing is not part of planning",
          "Use the same message everywhere without strategy",
          "Rely only on luck"
        ],
        answer: 0,
        explain: "Promotion should be audience-aware and aligned to the event's goals.",
        optionExplanations: [
          "Correct. Strategy matters more than generic promotion.",
          "Not correct. Marketing often plays a real role.",
          "Not correct. Messaging should be purposeful.",
          "Not correct. Planning should not depend on luck."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "Why is attendee experience important in event planning?",
        options: [
          "It affects satisfaction, reputation, and goal achievement",
          "It only matters after budgeting is finished",
          "It is less important than a decorative theme",
          "It cannot be influenced by planning choices"
        ],
        answer: 0,
        explain: "A strong event plan thinks through the participant journey, not just logistics.",
        optionExplanations: [
          "Correct. Experience is a major measure of event quality.",
          "Not correct. It matters throughout planning.",
          "Not correct. Theme is secondary to experience and outcomes.",
          "Not correct. Planning decisions shape the experience significantly."
        ],
        source: "manual-curated:event-planning"
      },
      {
        q: "What is the best final review step before presenting an event plan?",
        options: [
          "Check that goals, logistics, budget, risks, and metrics all align",
          "Add new ideas without testing feasibility",
          "Remove all backup plans to simplify the slides",
          "Ignore timing for the presentation itself"
        ],
        answer: 0,
        explain: "The final plan should feel coherent, realistic, and ready for judge questions.",
        optionExplanations: [
          "Correct. Alignment across the whole proposal matters.",
          "Not correct. Last-minute ideas can create inconsistency.",
          "Not correct. Risk planning is important.",
          "Not correct. Presentation timing still matters."
        ],
        source: "manual-curated:event-planning"
      }
    ],
    "Website Design": [
      {
        q: "What should guide website design decisions most?",
        options: [
          "The user's goals and the site's purpose",
          "Random visual trends only",
          "Ignoring content structure",
          "Using decoration instead of usability"
        ],
        answer: 0,
        explain: "Strong websites are designed around what users need to accomplish.",
        optionExplanations: [
          "Correct. User-centered design leads to better outcomes.",
          "Not correct. Trends should not override usability.",
          "Not correct. Structure is important.",
          "Not correct. Usability should come first."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "Why is navigation design important on a website?",
        options: [
          "It helps users find content quickly and confidently",
          "It only matters on large e-commerce sites",
          "It can be replaced by a splash page",
          "It should be different on every page"
        ],
        answer: 0,
        explain: "Clear navigation is one of the biggest contributors to usability.",
        optionExplanations: [
          "Correct. Navigation helps users understand where they are and where to go.",
          "Not correct. It matters across many site types.",
          "Not correct. A splash page does not replace navigation.",
          "Not correct. Consistency usually helps."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What is the best reason to use strong visual hierarchy on a webpage?",
        options: [
          "To help users scan and understand content priority",
          "To make every element compete equally",
          "To remove white space",
          "To avoid headings"
        ],
        answer: 0,
        explain: "Hierarchy helps users find key information without excessive effort.",
        optionExplanations: [
          "Correct. Hierarchy improves scannability and comprehension.",
          "Not correct. Equal emphasis usually hurts clarity.",
          "Not correct. White space can help hierarchy.",
          "Not correct. Headings often support hierarchy."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What makes a call to action effective on a website?",
        options: [
          "It is clear, visible, and aligned with the user's next step",
          "It is hidden at the bottom in tiny text",
          "It gives no clue what will happen",
          "There are ten competing primary actions"
        ],
        answer: 0,
        explain: "Good calls to action reduce friction and guide users toward the intended task.",
        optionExplanations: [
          "Correct. Visibility and clarity are key.",
          "Not correct. Hidden actions are less effective.",
          "Not correct. Users need clarity.",
          "Not correct. Too many primary actions create confusion."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "Why is mobile responsiveness important in website design?",
        options: [
          "Users may access the site on many screen sizes and contexts",
          "Only desktop users matter",
          "Responsive design removes the need for content strategy",
          "It is only a visual preference"
        ],
        answer: 0,
        explain: "Responsive design supports usable experiences across devices.",
        optionExplanations: [
          "Correct. Real users often switch across devices.",
          "Not correct. Mobile use matters a lot.",
          "Not correct. Content strategy still matters.",
          "Not correct. It affects usability, not just appearance."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What is the strongest reason to consider accessibility in web design?",
        options: [
          "More users can understand and use the site effectively",
          "Accessibility only matters for government websites",
          "It makes aesthetics impossible",
          "It only affects screen reader users"
        ],
        answer: 0,
        explain: "Accessibility improves usability for a broad range of users and contexts.",
        optionExplanations: [
          "Correct. Accessible design broadens usability.",
          "Not correct. It matters far beyond one sector.",
          "Not correct. Accessibility and strong aesthetics can coexist.",
          "Not correct. It benefits many users."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What is the best purpose of wireframes in a website design process?",
        options: [
          "To plan layout and user flow before detailed visual styling",
          "To finalize branding instantly",
          "To replace all prototyping",
          "To avoid stakeholder feedback"
        ],
        answer: 0,
        explain: "Wireframes let designers think through structure and flow before polishing visuals.",
        optionExplanations: [
          "Correct. Wireframes are useful for early structure planning.",
          "Not correct. Branding comes later.",
          "Not correct. Prototypes can still be useful.",
          "Not correct. Feedback is often valuable."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What is the biggest risk of cluttering a webpage with too many competing elements?",
        options: [
          "Users may lose focus and have a harder time completing tasks",
          "The site becomes automatically more engaging",
          "It guarantees better conversion",
          "It removes the need for information architecture"
        ],
        answer: 0,
        explain: "Clutter often weakens usability and makes pages harder to understand.",
        optionExplanations: [
          "Correct. Too much competition on the page can hurt clarity.",
          "Not correct. More clutter does not guarantee engagement.",
          "Not correct. Conversions usually suffer when clarity drops.",
          "Not correct. Structure still matters."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What kind of judge explanation is strongest for a website design choice?",
        options: [
          "This layout supports the target user's priorities and improves clarity",
          "I chose it with no user in mind",
          "It was random but colorful",
          "The design has no strategic reason"
        ],
        answer: 0,
        explain: "Judges want intentional, user-focused rationale behind design choices.",
        optionExplanations: [
          "Correct. User-centered reasoning is strongest.",
          "Not correct. User context matters.",
          "Not correct. Randomness is a weak explanation.",
          "Not correct. Strong design choices should have purpose."
        ],
        source: "manual-curated:website-design"
      },
      {
        q: "What is the best final check before presenting a website design?",
        options: [
          "Review the user flow, consistency, responsiveness, and clarity of key actions",
          "Add more pages without checking the structure",
          "Ignore whether the content is readable",
          "Assume the home page is enough to judge the whole design"
        ],
        answer: 0,
        explain: "Final review should confirm that the design works as a complete experience, not just as isolated screens.",
        optionExplanations: [
          "Correct. End-to-end experience matters.",
          "Not correct. Unchecked additions can create confusion.",
          "Not correct. Readability is essential.",
          "Not correct. The broader flow still matters."
        ],
        source: "manual-curated:website-design"
      }
    ],
    "Community Service Project": [
      {
        q: "What is the strongest starting point for a community service project proposal?",
        options: [
          "A clearly defined community need supported by evidence",
          "A random activity with no stated purpose",
          "Choosing a theme before identifying a problem",
          "Ignoring who will benefit"
        ],
        answer: 0,
        explain: "Strong service projects begin with a real need and a clear reason the project matters.",
        optionExplanations: [
          "Correct. Need identification should anchor the whole project.",
          "Not correct. A project needs purpose and context.",
          "Not correct. Theme should follow mission.",
          "Not correct. Beneficiaries are central."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "Why is goal-setting important in a community service project?",
        options: [
          "It helps the team define outcomes and measure impact",
          "It only matters after the project is over",
          "It replaces the need for volunteers",
          "It makes planning unnecessary"
        ],
        answer: 0,
        explain: "Clear goals help teams stay focused and later evaluate whether the project succeeded.",
        optionExplanations: [
          "Correct. Goals provide direction and evaluation criteria.",
          "Not correct. They matter from the start.",
          "Not correct. Volunteer coordination may still be needed.",
          "Not correct. Planning still matters."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "What kind of evidence best strengthens a service project presentation?",
        options: [
          "Specific results, metrics, testimonials, or documented outcomes",
          "Only broad claims with no proof",
          "Aesthetic slides without project details",
          "Unverified assumptions about impact"
        ],
        answer: 0,
        explain: "Judges want evidence that the project produced real benefit, not just good intentions.",
        optionExplanations: [
          "Correct. Measurable and documented outcomes are strongest.",
          "Not correct. Claims need evidence.",
          "Not correct. Design does not replace substance.",
          "Not correct. Verified impact is stronger."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "Why is stakeholder collaboration important in a community service project?",
        options: [
          "It helps the project fit real community needs and improve execution",
          "It only matters for large nonprofits",
          "It makes communication less important",
          "It replaces impact measurement"
        ],
        answer: 0,
        explain: "Working with affected groups or partner organizations improves relevance and feasibility.",
        optionExplanations: [
          "Correct. Collaboration often makes the project stronger and more credible.",
          "Not correct. It matters at many scales.",
          "Not correct. Communication remains essential.",
          "Not correct. Measurement still matters."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "What makes a project timeline strongest?",
        options: [
          "Clear milestones, responsibilities, and deadlines",
          "No deadlines so the team can improvise",
          "Only a final date with no intermediate steps",
          "A timeline disconnected from the actual project tasks"
        ],
        answer: 0,
        explain: "A useful timeline shows how the project moves from planning to execution to results.",
        optionExplanations: [
          "Correct. Milestones make the plan easier to manage and explain.",
          "Not correct. Lack of structure increases risk.",
          "Not correct. Intermediate steps matter.",
          "Not correct. Timelines should reflect the real work."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "Why should a community service team discuss sustainability or follow-through?",
        options: [
          "Judges want to know whether the project's value can continue beyond one moment",
          "Because every project must last forever",
          "Because impact only matters if it is permanent",
          "Because short-term projects can never be worthwhile"
        ],
        answer: 0,
        explain: "Sustainability shows thoughtful planning, even if the project is time-limited.",
        optionExplanations: [
          "Correct. Continuity or follow-through can strengthen the project's case.",
          "Not correct. Forever is not the standard.",
          "Not correct. Shorter efforts can still matter.",
          "Not correct. Temporary projects can still be impactful."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "What is the best way to describe team member contributions in the presentation?",
        options: [
          "Clearly explain roles and how the team executed the project together",
          "Say one person did everything",
          "Avoid discussing who did what",
          "Only mention titles without responsibilities"
        ],
        answer: 0,
        explain: "Judges benefit from understanding how the team organized the work and delivered results.",
        optionExplanations: [
          "Correct. Role clarity supports credibility and teamwork.",
          "Not correct. That usually does not reflect a real team effort.",
          "Not correct. Contribution clarity matters.",
          "Not correct. Responsibilities matter more than labels alone."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "What is the strongest answer if a judge asks how you knew the project mattered?",
        options: [
          "Describe the need assessment and the evidence of impact",
          "Say it felt like a good idea",
          "Avoid discussing the beneficiaries",
          "Claim any service is automatically equally effective"
        ],
        answer: 0,
        explain: "Impact should be tied to identified need and observed results.",
        optionExplanations: [
          "Correct. Need plus evidence creates a strong answer.",
          "Not correct. Intuition alone is weaker than evidence.",
          "Not correct. Beneficiaries are central to the explanation.",
          "Not correct. Effectiveness varies by planning and execution."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "Why is reflection useful in a service project presentation?",
        options: [
          "It shows what the team learned and how the work could improve",
          "It replaces the need to show outcomes",
          "It only matters if the project failed",
          "It should be purely emotional with no analysis"
        ],
        answer: 0,
        explain: "Reflection helps demonstrate maturity, learning, and thoughtful leadership.",
        optionExplanations: [
          "Correct. Reflection adds depth to the project's story.",
          "Not correct. Outcomes still matter.",
          "Not correct. Reflection is useful in successful projects too.",
          "Not correct. Thoughtful analysis strengthens reflection."
        ],
        source: "manual-curated:community-service-project"
      },
      {
        q: "What is the best final review before presenting a community service project?",
        options: [
          "Check that the need, actions, evidence, and impact story all connect clearly",
          "Add unrelated service ideas at the last minute",
          "Remove specific metrics to simplify the slides",
          "Assume judges already know the community context"
        ],
        answer: 0,
        explain: "The final presentation should feel coherent from problem to action to measured result.",
        optionExplanations: [
          "Correct. Strong coherence helps the project feel credible and complete.",
          "Not correct. Last-minute additions can weaken focus.",
          "Not correct. Metrics often help strengthen the case.",
          "Not correct. Context should still be explained clearly."
        ],
        source: "manual-curated:community-service-project"
      }
    ],
    "Mobile Application Development": [
      {
        q: "What should guide the design of a mobile app most?",
        options: [
          "The user's task flow and the problem the app solves",
          "Only visual effects",
          "Ignoring small-screen constraints",
          "Adding features without a purpose"
        ],
        answer: 0,
        explain: "Strong app design starts with user needs and the actions the app must support well.",
        optionExplanations: [
          "Correct. User-centered purpose should drive app decisions.",
          "Not correct. Visual polish is important, but it is not the core driver.",
          "Not correct. Mobile constraints matter a lot.",
          "Not correct. Features should be purposeful."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "Why is responsive input handling especially important in a mobile app?",
        options: [
          "Touch interactions need to feel reliable and immediate",
          "Users expect apps to lag on phones",
          "It only matters on tablets",
          "It replaces the need for testing"
        ],
        answer: 0,
        explain: "Mobile users expect taps, gestures, and transitions to respond quickly and clearly.",
        optionExplanations: [
          "Correct. Responsiveness strongly affects perceived quality.",
          "Not correct. Lag hurts the experience.",
          "Not correct. It matters across phones and tablets.",
          "Not correct. Testing still matters."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "What is the best reason to prototype app flows before building everything?",
        options: [
          "It helps validate navigation and usability early",
          "It guarantees the code will have no bugs",
          "It eliminates the need for design iteration",
          "It only matters for very large teams"
        ],
        answer: 0,
        explain: "Prototypes help teams catch UX issues before full implementation.",
        optionExplanations: [
          "Correct. Early flow testing improves product quality.",
          "Not correct. Bugs can still happen.",
          "Not correct. Iteration is still useful.",
          "Not correct. It matters in competition projects too."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "Why is offline or poor-connection behavior worth considering in a mobile app?",
        options: [
          "Users may not always have stable connectivity",
          "Mobile apps are always used on fast networks",
          "Connectivity never affects experience",
          "It only matters for games"
        ],
        answer: 0,
        explain: "Mobile contexts vary widely, so graceful handling of weak connections improves reliability.",
        optionExplanations: [
          "Correct. Connectivity-aware design improves robustness.",
          "Not correct. Real network conditions vary.",
          "Not correct. Connectivity often matters a lot.",
          "Not correct. Many app types need to account for it."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "What makes mobile navigation strongest?",
        options: [
          "Clear, simple paths to key tasks without unnecessary friction",
          "Deep hidden menus for every feature",
          "A different navigation pattern on every screen",
          "Tiny tap targets"
        ],
        answer: 0,
        explain: "Mobile navigation should reduce effort and support common tasks quickly.",
        optionExplanations: [
          "Correct. Simplicity and consistency are key.",
          "Not correct. Hidden complexity hurts usability.",
          "Not correct. Consistency usually helps users.",
          "Not correct. Touch targets should be usable."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "Why should developers test an app on real devices when possible?",
        options: [
          "Performance, layout, and interaction can differ from emulator expectations",
          "Real devices are never necessary",
          "It only matters after the event",
          "Screenshots alone prove the app works"
        ],
        answer: 0,
        explain: "Real-device testing helps catch practical issues with touch, performance, and display behavior.",
        optionExplanations: [
          "Correct. Real usage conditions often reveal issues earlier.",
          "Not correct. Device testing can be very valuable.",
          "Not correct. It matters before submission too.",
          "Not correct. Screenshots do not prove behavior."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "What is the strongest reason to manage app state carefully?",
        options: [
          "It helps keep the interface and data behavior predictable",
          "It only matters in desktop apps",
          "It removes the need for user testing",
          "It makes debugging impossible"
        ],
        answer: 0,
        explain: "Good state management helps apps behave consistently as users move through flows.",
        optionExplanations: [
          "Correct. Predictable state supports usability and maintainability.",
          "Not correct. It matters in mobile apps too.",
          "Not correct. Testing is still needed.",
          "Not correct. Clear state handling can improve debugging."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "What is the best way to discuss app security or privacy in a presentation?",
        options: [
          "Explain how the app handles user data responsibly and minimizes unnecessary exposure",
          "Say privacy never matters in student apps",
          "Collect all available data without justification",
          "Avoid mentioning permissions or data handling"
        ],
        answer: 0,
        explain: "Judges often value thoughtful attention to privacy, permissions, and responsible data use.",
        optionExplanations: [
          "Correct. Responsible data handling is a strength.",
          "Not correct. Privacy still matters.",
          "Not correct. Unnecessary collection is poor practice.",
          "Not correct. Transparency is better."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "What is the strongest demo strategy for a mobile app event?",
        options: [
          "Walk through the main user flow and show the app solving the target problem",
          "Spend all the time on splash screens",
          "Describe the idea without showing the app",
          "Hide any unfinished areas and avoid questions"
        ],
        answer: 0,
        explain: "A focused demo helps judges understand the app's practical value and quality quickly.",
        optionExplanations: [
          "Correct. Core flow demonstrations are the most persuasive.",
          "Not correct. Peripheral screens are less important.",
          "Not correct. The working app should be shown.",
          "Not correct. Honest, prepared explanation is stronger."
        ],
        source: "manual-curated:mobile-application-development"
      },
      {
        q: "What is the best final submission check for a mobile application project?",
        options: [
          "Verify the core features work reliably and the demo path is polished",
          "Add last-minute features without testing",
          "Assume judges will ignore crashes or broken states",
          "Remove setup instructions without review"
        ],
        answer: 0,
        explain: "Before submission, the highest priority is a stable, demo-ready build that satisfies the prompt.",
        optionExplanations: [
          "Correct. Reliability and completeness matter most at the end.",
          "Not correct. Untested features are risky.",
          "Not correct. Stability problems are serious.",
          "Not correct. Clear setup instructions may still matter."
        ],
        source: "manual-curated:mobile-application-development"
      }
    ]
  };
  const MANUAL_QUESTION_OVERRIDES = new Map([
    [norm("FBLA provides an integral part of the instructional program for students in grades _____ in business."), {
      q: "FBLA currently serves members through which divisions?",
      options: [
        "Middle School, High School, and Collegiate",
        "High School only",
        "High School and Collegiate only",
        "Middle School and Alumni & Professional only"
      ],
      answer: 0,
      explain: "Manually updated to match the current official FBLA division structure: Middle School, High School, and Collegiate.",
      optionExplanations: [
        "Correct. FBLA currently includes Middle School, High School, and Collegiate divisions.",
        "Not correct. FBLA is not limited to high school.",
        "Not correct. Middle School is also an official division.",
        "Not correct. Alumni & Professional is not one of the three student divisions."
      ]
    }],
    [norm("There are five administrative regions for FBLA. Texas would be a member of the _____ region."), {
      q: "For the 2025-2026 FBLA membership year, Texas belongs to which FBLA region?",
      explain: "Manually clarified with an exact date. For the 2025-2026 year, Texas is in the Mountain Plains Region. FBLA has announced a shift to four regions beginning in 2026-2027.",
      optionExplanations: [
        "Not correct. Texas was not in the North Central Region for the 2025-2026 year.",
        "Not correct. Texas was not in the Southern Region for the 2025-2026 year.",
        "Correct. Texas is in the Mountain Plains Region for the 2025-2026 membership year.",
        "Not correct. Texas was not in the Western Region for the 2025-2026 year."
      ]
    }],
    [norm("There are _____ FBLA administrative regions."), {
      q: "For the 2025-2026 FBLA membership year, how many administrative regions are in use?",
      explain: "Manually clarified with an exact date. FBLA used five administrative regions for 2025-2026, with a transition to four regions announced for 2026-2027.",
      optionExplanations: [
        "Not correct. Three regions is too few for the 2025-2026 structure.",
        "Correct. FBLA used five administrative regions for the 2025-2026 membership year.",
        "Not correct. Four regions applies to the announced 2026-2027 reorganization, not 2025-2026.",
        "Not correct. Seven regions was not the 2025-2026 structure."
      ]
    }],
    [norm("A firm must register with the SEC if they manage more than _____ million in client assets."), {
      q: "Under the current SEC adviser registration framework, which listed asset level is the closest threshold at which federal SEC registration begins?",
      answer: 3,
      explain: "Manually updated because the original historical threshold is outdated. Advisers generally become SEC-registerable starting around $100 million in regulatory assets under management and are typically required by $110 million.",
      optionExplanations: [
        "Not correct. $50 million is below the modern federal threshold.",
        "Not correct. $30 million is an outdated threshold.",
        "Not correct. $10 million is far below the modern threshold.",
        "Correct. $100 million is the closest listed threshold to the modern SEC registration trigger."
      ]
    }],
    [norm("A school is upgrading from a single switch to a network that has multiple switches in different wings of the building. Which device is essential to connect the switches for proper data communication?"), {
      q: "A school is upgrading from a single switch to a network that has multiple switches in different wings of the building. Which device is essential to route traffic between the different network segments in those wings?",
      explain: "Manually clarified after review because the original FBLA HQ wording was too imprecise. A router is used to route traffic between different network segments.",
      optionExplanations: [
        "Correct. A router is used to route traffic between different network segments.",
        "Not correct. A hub repeats traffic and is not the right choice for routing between network segments.",
        "Not correct. A patch panel is a cabling termination point, not a traffic-routing device.",
        "Not correct. A firewall filters traffic but is not the primary device for routing between network segments."
      ]
    }],
    [norm("The IT department tests the failover time between the primary and backup servers. This is a measure of:"), {
      answer: 0,
      explain: "Manually corrected after review because failover time most directly reflects fault tolerance rather than mere redundancy.",
      optionExplanations: [
        "Correct. Failover time measures how well the system continues operating when a component fails, which is fault tolerance.",
        "Not correct. Latency is delay in data transmission, not server failover behavior.",
        "Not correct. Bandwidth allocation concerns throughput, not failover response.",
        "Not correct. Redundancy means backups exist, but failover time measures how effectively the system tolerates failure."
      ]
    }]
  ]);
  
  /* ─── Static Resource File Map ─── */
  
  const EVENT_FILE_RESOURCES = (function buildResourceMap() {
    /* ── Pattern tables ──
       Each source directory has predictable naming conventions.
       We map from the EVENTS list to the actual filenames on disk. */
  
    /* 1. fblaresources/objective tests/ — Sample question PDFs */
    const objTestMap = {
      "Accounting": "Accounting-Sample-Questions.pdf",
      "Advanced Accounting": "Advanced-Accounting-Sample-Questions.pdf",
      "Advertising": "Advertising-Sample-Questions.pdf",
      "Agribusiness": "Agribusiness-Sample-Questions.pdf",
      "Banking & Financial Systems": "Banking--Financial-Systems-Sample-Questions.pdf",
      "Business Communication": "Business-Communication-Sample-Questions.pdf",
      "Business Ethics": "Business-Ethics-Sample-Questions.pdf",
      "Business Law": "Business-Law-Sample-Questions.pdf",
      "Business Management": "Business-Management-Sample-Questions.pdf",
      "Computer Problem Solving": "Computer-Problem-Solving-Sample-Questions.pdf",
      "Customer Service": "Customer-Service-Sample-Questions.pdf",
      "Cybersecurity": "Cybersecurity-Sample-Questions.pdf",
      "Data Science & AI": "Data-Science--AI-Sample-Questions.pdf",
      "Economics": "Economics-Sample-Questions.pdf",
      "Entrepreneurship": "Entrepreneurship-Sample-Questions.pdf",
      "Future Business Leader": "Future-Business-Leader-Sample-Questions.pdf",
      "Healthcare Administration": "Healthcare-Administration-Sample-Questions.pdf",
      "Hospitality & Event Management": "Hospitality--Event-Management-Sample-Questions.pdf",
      "Human Resource Management": "Human-Resource-Management-Sample-Questions.pdf",
      "Insurance & Risk Management": "Insurance--Risk-Management-Sample-Questions.pdf",
      "International Business": "International-Business-Sample-Questions.pdf",
      "Introduction to Business Communication": "Intro-to-Business-Communication-Sample-Questions.pdf",
      "Introduction to Business Concepts": "Intro-to-Business-Concepts-Sample-Questions.pdf",
      "Introduction to Business Procedures": "Intro-to-Business-Procedures-Sample-Questions.pdf",
      "Introduction to FBLA": "Intro-to-FBLA-Sample-Questions.pdf",
      "Introduction to Information Technology": "Intro-to-Information-Technology-Sample-Questions.pdf",
      "Introduction to Marketing Concepts": "Intro-to-Marketing-Concepts-Sample-Questions.pdf",
      "Introduction to Parliamentary Procedure": "Intro-to-Parli-Pro-Sample-Questions.pdf",
      "Introduction to Retail & Merchandising": "Intro-to-Retail--Merchandising-Sample-Questions.pdf",
      "Introduction to Supply Chain Management": "Intro-to-Supply-Chain-Management-Sample-Questions.pdf",
      "Journalism": "Journalism-Sample-Questions.pdf",
      "Management Information Systems": "Management-Information-Systems-Sample-Questions.pdf",
      "Marketing": "Marketing-Sample-Questions.pdf",
      "Network Design": "Network-Design-Sample-Questions.pdf",
      "Networking Infrastructures": "Networking-Infrastructures-Sample-Questions.pdf",
      "Organizational Leadership": "Organizational-Leadership-Sample-Questions.pdf",
      "Parliamentary Procedure Individual": "Parliamentary-Procedure-Sample-Questions.pdf",
      "Parliamentary Procedure Team": "Parliamentary-Procedure-Sample-Questions.pdf",
      "Personal Finance": "Personal-Finance-Sample-Questions.pdf",
      "Project Management": "Project-Management-Sample-Questions.pdf",
      "Public Administration & Management": "Public-Administration--Management-Sample-Questions.pdf",
      "Real Estate": "Real-Estate-Sample-Questions.pdf",
      "Retail Management": "Retail-Management-Sample-Questions.pdf",
      "Securities & Investments": "Securities--Investments-Sample-Questions.pdf",
      "Sports & Entertainment Management": "Sports--Entertainment-Management-Sample-Questions.pdf",
      "Technology Support & Services": "Technology-Support--Services-Sample-Questions.pdf"
    };
  
    /* 2. fblaresources/production test/ */
    const prodTestMap = {
      "Computer Applications": "Computer-Applications-Sample-Production-Test.pdf"
    };
  
    /* 3. fblaresources/sample roleplays/ — Each event has numbered sample DOCX/PDF files */
    const roleplaySampleMap = {
      "Banking & Financial Systems": { prefix: "Banking-and-Financial-Systems---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,8] },
      "Business Management": { prefix: "Business-Management---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10] },
      "Customer Service": { prefix: "Customer-Service---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10,11,12] },
      "Entrepreneurship": { prefix: "Entrepreneurship---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7] },
      "Hospitality & Event Management": { prefix: "Hospitality--Event-Management---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] },
      "Impromptu Speaking": { prefix: "Impromptu-Speaking---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10,11] },
      "International Business": { prefix: "International-Business---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
      "Event Planning": { prefix: "Introduction-to-Event-Planning---Sample-", ext: ".pdf", nums: [1,2,3,4,5,6] },
      "Management Information Systems": { prefix: "Management-Information-Systems---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7] },
      "Marketing": { prefix: "Marketing---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
      "Network Design": { prefix: "Network-Design---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
      "Parliamentary Procedure Individual": { prefix: "Parliamentary-Procedure---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
      "Parliamentary Procedure Team": { prefix: "Parliamentary-Procedure---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
      "Sports & Entertainment Management": { prefix: "Sports-and-Entertainment-Management---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7] },
      "Technology Support & Services": { prefix: "Technology-Support--Services---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] }
    };
  
    /* 4. FBLA Time/FBLA Time/<folder>/ — Study guides, competencies, past tests */
    const fblaTimeFolderMap = {
      "Accounting": "Accounting I",
      "Advanced Accounting": "Accounting II",
      "Advertising": "Advertising",
      "Agribusiness": "Agribusiness",
      "Banking & Financial Systems": "Banking _ Financial Systems",
      "Business Communication": "Business Communication",
      "Business Law": "Business Law",
      "Computer Applications": "Computer Applications",
      "Computer Problem Solving": "Computer Problem Solving",
      "Cybersecurity": "Cyber Security",
      "Economics": "Economics",
      "Entrepreneurship": "Entrepreneurship",
      "Financial Planning": "Introduction to Financial Math",
      "Future Business Leader": "Future Business Leader",
      "Graphic Design": "Graphic Design",
      "Healthcare Administration": "Healthcare Administration",
      "Hospitality & Event Management": "Hospitality Management",
      "Impromptu Speaking": "Impromptu Speaking",
      "Insurance & Risk Management": "Insurance _ Risk Management",
      "International Business": "Global Business",
      "Introduction to Business Communication": "Introduction to Business Communication",
      "Introduction to Business Concepts": "Introduction to Business",
      "Introduction to Business Procedures": "Introduction to Business Procedures",
      "Introduction to FBLA": "Introduction to FBLA",
      "Introduction to Information Technology": "Introduction to Information Technology",
      "Introduction to Parliamentary Procedure": "Introduction to Parliamentary Procedure",
      "Journalism": "Journalism",
      "Management Information Systems": "Management Information Systems",
      "Marketing": "Marketing",
      "Network Design": "Network Design",
      "Networking Infrastructures": "Networking Concepts",
      "Organizational Leadership": "Organizational Leadership",
      "Parliamentary Procedure Individual": "Parliamentary Procedure",
      "Parliamentary Procedure Team": "Parliamentary Procedure",
      "Personal Finance": "Personal Finance",
      "Securities & Investments": "Securities _ Investments",
      "Sports & Entertainment Management": "Sports _ Entertainment Management",
      "Technology Support & Services": "Help Desk"
    };
  
    /* Detailed file lists per FBLA Time folder (the actual filenames on disk).
       Keyed by folder name → array of filenames. */
    const fblaTimeFiles = {
      "Accounting I": [
        "2016 SLC Accounting I.docx",
        "Accounting I Study Guide 2007-10.pdf",
        "Accounting I Study Guide 2010-13.pdf",
        "Accounting I Study Guide 2013-16.pdf",
        "Accounting I Tasks and Competencies List.pdf"
      ],
      "Accounting II": [
        "2016 SLC Accounting II.docx",
        "Accounting II Study Guide 2007-10.pdf",
        "Accounting II Study Guide 2010-13.pdf",
        "Accounting II Study Guide 2013-16.pdf",
        "Accounting II Tasks and Competencies List.pdf"
      ],
      "Advertising": [
        "Advertising Competencies _ Task List.pdf",
        "ADVERTISING, District Test.docx"
      ],
      "Agribusiness": [
        "2016 SLC Agribusiness.docx",
        "Agribusiness Study Guide 2013-16.pdf",
        "Agribusiness Tasks and Competencies List.pdf"
      ],
      "Banking _ Financial Systems": [
        "2016 SLC Banking _ Financial Systems.docx",
        "Banking _ Financial Systems Study Guide 2007-10.pdf",
        "Banking _ Financial Systems Study Guide 2010-13.pdf",
        "Banking _ Financial Systems Study Guide 2013-16.pdf",
        "Banking _ Financial Systems Tasks _ Competencies List.pdf",
        "Banking _ Financial Systems.docx"
      ],
      "Business Calculations": [
        "2016 SLC Business Calculations.docx",
        "Business Calculations Study Guide 2007-10.pdf",
        "Business Calculations Study Guide 2010-13.pdf",
        "Business Calculations Study Guide 2013-16.pdf",
        "Business Calculations Tasks _ Competencies List.pdf"
      ],
      "Business Communication": [
        "2016 SLC Business Communication.docx",
        "Business Communication Study Guide 2007-10.pdf",
        "Business Communication Study Guide 2010-13.pdf",
        "Business Communication Study Guide 2013-16.pdf",
        "Business Communication Tasks _ Competencies List.pdf"
      ],
      "Business Law": [
        "2016 SLC Business Law.docx",
        "Business Law Study Guide 2007-10.pdf",
        "Business Law Study Guide 2010-13.pdf",
        "Business Law Study Guide 2013-16.pdf",
        "Business Law Tasks _ Competencies List.pdf"
      ],
      "Client Service": [
        "2011 NLC CLIENT SERVICE Final.docx",
        "2011 NLC CLIENT SERVICE Preliminary.docx",
        "2011 SLC FBLA Client Service 1.docx",
        "2011 SLC FBLA Client Service 2.docx",
        "2011 SLC FBLA Client Service EXTRA 1.docx",
        "2011 SLC FBLA Client Service EXTRA 2.docx",
        "2012 SLC Client Service.docx",
        "2012 SLC Final Client Service.docx",
        "2015 RLC Client Service Case A Judges.docx",
        "2015 RLC Client Service Case B Judges.docx",
        "2015 SLC Client Service Final Case Judges.docx",
        "2015 SLC Client Service Prelim Case Judges.docx",
        "2016 FBLA Client Service_1.docx",
        "2016 FBLA Client Service_2.docx",
        "Client Service Case FINAL EDIT.docx",
        "Client Service Case PRELIMINARY EDIT.docx",
        "Client Service Case Study - 2009 RLC.docx",
        "Client Service_2008 RLC.docx",
        "FBLA Client Service Case FINAL.docx",
        "FBLA Client Service Final National.docx",
        "FBLA Client Service Prel Case FINAL.docx",
        "FBLA Client Service PRel National.docx",
        "Katrina_s Guide.pdf"
      ],
      "Computer Applications": [
        "2016 SLC Computer Applications.docx",
        "2017 SLC Computer Applications Production Test.pdf",
        "Computer Applications Study Guide 2007-10.pdf",
        "Computer Applications Study Guide 2010-13.pdf",
        "Computer Applications Study Guide 2013-16.pdf",
        "Computer Applications Tasks _ Competencies List.pdf"
      ],
      "Computer Problem Solving": [
        "2016 SLC Computer Problem Solving.docx",
        "Computer Problem Solving Study Guide 2007-10.pdf",
        "Computer Problem Solving Study Guide 2010-13.pdf",
        "Computer Problem Solving Study Guide 2013-16.pdf",
        "Computer Problem Solving Tasks _ Competencies List.pdf"
      ],
      "Cyber Security": [
        "2016 SLC Cyber Security.docx",
        "Cyber Security Study Guide 2007-10.pdf",
        "Cyber Security Study Guide 2010-13.pdf",
        "Cyber Security Study Guide 2013-16.pdf",
        "Cyber Security Tasks _ Competencies List.pdf"
      ],
      "Database Design _ Applications": [
        "2016 SLC Database Design _ Applications.docx",
        "2017 SLC Database Design _ Applications Production Test.pdf",
        "Database Design _ Applications Study Guide 2007-10.pdf",
        "Database Design _ Applications Study Guide 2010-13.pdf",
        "Database Design _ Applications Study Guide 2013-16.pdf",
        "Database Design _ Applications Tasks _ Competencies List.pdf"
      ],
      "Economics": [
        "2016 SLC Economics.docx",
        "Economics Study Guide 2007-10.pdf",
        "Economics Study Guide 2010-13.pdf",
        "Economics Study Guide 2013-16.pdf",
        "Economics Tasks _ Competencies List.pdf"
      ],
      "Entrepreneurship": [
        "2016 PBL Entrepreneurship.docx",
        "2016 SLC Entrepreneurship.docx",
        "Entrepreneurship Study Guide 2007-10.pdf",
        "Entrepreneurship Study Guide 2010-13.pdf",
        "Entrepreneurship Study Guide 2013-16.pdf",
        "Entrepreneurship Tasks _ Competencies List.pdf"
      ],
      "Future Business Leader": [
        "2016 SLC Future Business Leader.docx",
        "Future Business Leader Study Guide 2007-10.pdf",
        "Future Business Leader Study Guide 2010-13.pdf",
        "Future Business Leader Study Guide 2013-16.pdf"
      ],
      "Global Business": [
        "2016 FBLA Global Business Case.docx",
        "2016 SLC Global Business.docx",
        "Global Business Study Guide 2007-10.pdf",
        "Global Business Study Guide 2010-13.pdf",
        "Global Business Study Guide 2013-16.pdf",
        "Global Business Tasks _ Competencies List.pdf"
      ],
      "Graphic Design": [
        "Digital Sales Kit - Hyatt Menus.pdf",
        "Menus - Classic Center.pdf",
        "Nick GoPlay Branding Deck.pdf"
      ],
      "Healthcare Administration": [
        "2016 SLC Healthcare Administration.docx",
        "Health Care Administration Study Guide 2010-13.pdf",
        "Health Care Administration Study Guide 2013-16.pdf",
        "Health Care Administration Tasks _ Competencies List.pdf"
      ],
      "Help Desk": [
        "Help Desk Study Guide 2007-10.pdf",
        "Help Desk Study Guide 2010-13.pdf",
        "Help Desk Study Guide 2013-16.pdf",
        "Help Desk Tasks _ Competencies List.pdf"
      ],
      "Hospitality Management": [
        "2016 FBLA Hospitality Management Case.docx",
        "2016 SLC Hospitality Management.docx",
        "Hospitality Management Study Guide 2010-13.pdf",
        "Hospitality Management Study Guide 2013-16.pdf",
        "Hospitality Management Tasks _ Competencies List.pdf"
      ],
      "Impromptu Speaking": [
        "2016 FBLA Impromptu Speaking Topics, v.docx",
        "2016 PBL Impromptu Speaking Topics, v.docx"
      ],
      "Insurance _ Risk Management": [
        "2016 SLC Insurance _ Management.docx",
        "Insurance _ Risk Management Study Guide 2013-16.pdf",
        "Insurance _ Risk Management Tasks _ Competencies List.pdf"
      ],
      "Introduction to Business Communication": [
        "2016 SLC Intro to Business Communication.docx",
        "Introduction to Business Communication Study Guide 2007-10.pdf",
        "Introduction to Business Communication Study Guide 2010-13.pdf",
        "Introduction to Business Communication Study Guide 2013-16.pdf",
        "Introduction to Business Communication Tasks _ Competencies Task List.pdf"
      ],
      "Introduction to Business": [
        "2016 SLC Intro to Business.docx",
        "Introduction to Business Study Guide 2007-10.pdf",
        "Introduction to Business Study Guide 2010-13.pdf",
        "Introduction to Business Study Guide 2013-16.pdf",
        "Introduction to Business Tasks _ Competencies List.pdf"
      ],
      "Introduction to Business Procedures": [
        "2016 SLC Intro to Business Procedures.docx",
        "Business Procedures Study Guide 2007-10.pdf",
        "Business Procedures Study Guide 2010-13.pdf",
        "Business Procedures Study Guide 2013-16.pdf",
        "Business Procedures Tasks _ Competencies List.pdf"
      ],
      "Introduction to FBLA": [
        "2016 SLC FBLA Principles _ Procedures.docx",
        "FBLA Principles _ Procedures Study Guide 2007-10.pdf",
        "FBLA Principles _ Procedures Study Guide 2010-13.pdf",
        "FBLA Principles _ Procedures Study Guide 2013-16.pdf"
      ],
      "Introduction to Financial Math": [
        "2016 SLC Intro to Financial Math.docx",
        "Business Math Study Guide 2007-10.pdf",
        "Business Math Study Guide 2010-13.pdf",
        "Business Math Study Guide 2013-16.pdf",
        "Business Math Tasks _ Competencies List.pdf"
      ],
      "Introduction to Information Technology": [
        "2016 SLC Intro to Information Technology.docx",
        "Introduction to Information Technology Study Guide 2007-10.pdf",
        "Introduction to Information Technology Study Guide 2010-13.pdf",
        "Introduction to Information Technology Study Guide 2013-16.pdf",
        "Introduction to Information Technology Tasks _ Competencies List.pdf",
        "Technology Concepts Study Guide 2007-10.pdf",
        "Technology Concepts Study Guide 2010-13.pdf"
      ],
      "Introduction to Parliamentary Procedure": [
        "2016 SLC Intro to Parliamentary Procedure.docx",
        "Introduction to Parliamentary Procedure Study Guide 2007-10.pdf",
        "Introduction to Parliamentary Procedure Study Guide 2010-13.pdf",
        "Introduction to Parliamentary Procedure Study Guide 2013-16.pdf"
      ],
      "Journalism": [
        "Journalism Competency _ Task List.pdf",
        "JOURNALISM, District Test.docx"
      ],
      "Management Decision Making": [
        "2016 FBLA Management Decision Making Case.docx",
        "2016 SLC Management Decision Making.docx",
        "Management Decision Making Study Guide 2007-10.pdf",
        "Management Decision Making Study Guide 2010-13.pdf",
        "Management Decision Making Study Guide 2013-16.pdf",
        "Management Decision Making Tasks _ Competencies List.pdf"
      ],
      "Management Information Systems": [
        "2016 FBLA Management Information Systems Case.docx",
        "2016 SLC Management Information Systems.docx",
        "Management Information Systems Study Guide 2007-10.pdf",
        "Management Information Systems Study Guide 2010-13.pdf",
        "Management Information Systems Study Guide 2013-16.pdf",
        "Management Information Systems Tasks _ Competencies List.pdf"
      ],
      "Marketing": [
        "2016 FBLA Marketing Case.docx",
        "2016 SLC Marketing.docx",
        "Marketing Study Guide 2007-10.pdf",
        "Marketing Study Guide 2010-13.pdf",
        "Marketing Study Guide 2013-16.pdf",
        "Marketing Tasks _ Competencies List.pdf"
      ],
      "Network Design": [
        "2016 FBLA Network Design Case.docx",
        "2016 SLC  Network Design.docx",
        "Network Design Study Guide 2007-10.pdf",
        "Network Design Study Guide 2010-13.pdf",
        "Network Design Study Guide 2013-16.pdf",
        "Network Design Tasks _ Competencies List.pdf"
      ],
      "Networking Concepts": [
        "2016 SLC Networking Concepts.docx",
        "Networking Concepts Study Guide 2007-10.pdf",
        "Networking Concepts Study Guide 2010-13.pdf",
        "Networking Concepts Study Guide 2013-16.pdf",
        "Networking Concepts Tasks _ Competencies List.pdf"
      ],
      "Organizational Leadership": [
        "Organizational Leadership Competency _ Task List.pdf",
        "ORGANIZATIONAL LEADERSHIP, District Test.docx"
      ],
      "Parliamentary Procedure": [
        "2016 FBLA Parliamentary Procedure Case.docx",
        "Bylaws Study Guide.pdf",
        "Parliamentary Procedure - 2016 SLC.docx",
        "Parliamentary Procedure Study Guide 2007-10.pdf",
        "Parliamentary Procedure Study Guide 2010-13.pdf",
        "Parliamentary Procedure Study Guide 2013-16.pdf"
      ],
      "Personal Finance": [
        "Personal Finance Study Guide 2007-10.pdf",
        "Personal Finance Study Guide 2010-13.pdf",
        "Personal Finance Study Guide 2013-16.pdf",
        "Personal Finance Tasks _ Competencies List.pdf"
      ],
      "Publication Design": [
        "Desktop Publishing Study Guide 2007-10.pdf",
        "Desktop Publishing Study Guide 2010-13.pdf",
        "Desktop Publishing Study Guide 2013-16.pdf",
        "Desktop Publishing Tasks _ Competencies List.pdf"
      ],
      "Securities _ Investments": [
        "2016 SLC Securities _ Investments.docx",
        "Securities _ Investments Tasks _ Competencies List.pdf"
      ],
      "Sports _ Entertainment Management": [
        "2016 FBLA Sports and Entertainment Management Case.docx",
        "2016 SLC Sports _ Entertainment Management.docx",
        "Sports _ Entertainment Management Study Guide 2010-13.pdf",
        "Sports _ Entertainment Management Study Guide 2013-16.pdf",
        "Sports _ Entertainment Management Tasks _ Competencies List.pdf"
      ],
      "Spreadsheet Applications": [
        "2016 SLC Spreadsheet Applications.docx",
        "2017 SLC Spreadsheet Applications Production Test.pdf",
        "Spreadsheet Applications Study Guide 2007-10.pdf",
        "Spreadsheet Applications Study Guide 2010-13.pdf",
        "Spreadsheet Applications Study Guide 2013-16.pdf",
        "Spreadsheet Applications Tasks _ Competencies List.pdf"
      ],
      "Word Processing": [
        "2016 SLC Word Processing.docx",
        "2017 SLC Word Processing Production Test.pdf",
        "Word Processing Study Guide 2007-10.pdf",
        "Word Processing Study Guide 2010-13.pdf",
        "Word Processing Study Guide 2013-16.pdf",
        "Word Processing Tasks _ Competencies List.pdf"
      ]
    };
  
    /* 5. Full FBLA Mega Folder — supplemental files not already in FBLA Time */
    const megaFolderFiles = {
      "Advertising": [
        "Advertising Competencies _ Task List.docx"
      ],
      "Client Service": [
        "PBL Client Service Case FINAL EDIT.docx",
        "PBL Client Service Case PRELIMINARY EDIT.docx"
      ],
      "Database Design _ Applications": [
        "Database Design _ Applications Study Guide 2007-10.docx",
        "Testfrenzy Rehost/Arizona FBLA Test.doc",
        "Testfrenzy Rehost/Database Practice Test.doc",
        "Testfrenzy Rehost/Database Practice Test.docx",
        "Testfrenzy Rehost/Database Test with Visuals.doc",
        "Testfrenzy Rehost/Lesson 1-7 Database Quizzes.doc"
      ],
      "Entrepreneurship": [
        "Entrepreneurship Study Guide 2010-13.docx"
      ],
      "Hospitality Management": [
        "Hospitality Management Tasks _ Competencies List.docx"
      ],
      "Introduction to Business": [
        "Introduction to Business Study Guide 2007-10.docx",
        "Introduction to Business Study Guide 2010-13.docx"
      ],
      "Introduction to Information Technology": [
        "Introduction to Information Technology Study Guide 2007-10.docx",
        "Introduction to Information Technology Study Guide 2010-13.docx",
        "Introduction to Information Technology Study Guide 2013-16.docx",
        "Introduction to Information Technology Tasks _ Competencies List.docx",
        "Technology Concepts Study Guide 2007-10.docx",
        "Technology Concepts Study Guide 2010-13.docx"
      ],
      "Networking Concepts": [
        "Networking Concepts Tasks _ Competencies List.docx"
      ],
      "Organizational Leadership": [
        "Organizational Leadership Competency _ Task List.docx"
      ],
      "Parliamentary Procedure": [
        "Parliamentary Procedure Study Guide 2007-10.docx"
      ],
      "Sports _ Entertainment Management": [
        "Sports _ Entertainment Management Tasks _ Competencies List.docx"
      ]
    };
  
    /* NAP guide — only relevant to Parliamentary Procedure events */
    const napResource = { label: "NAP Study Guide", path: "fblaresources/objective tests/National-Association-of-Parliamentarians-Study-Guide.pdf", category: "study-guide" };
    const parliEvents = ["Parliamentary Procedure Individual", "Parliamentary Procedure Team", "Introduction to Parliamentary Procedure"];
  
    /* Classify a filename into a readable category label */
    function classifyFile(filename) {
      const fl = filename.toLowerCase();
      if (/study guide/i.test(fl)) return "study-guide";
      if (/task|competenc/i.test(fl)) return "competencies";
      if (/production test/i.test(fl)) return "production";
      if (/sample.*question|sample-question/i.test(fl)) return "sample-test";
      if (/case|roleplay|sample/i.test(fl)) return "roleplay";
      if (/district test/i.test(fl)) return "sample-test";
      if (/slc|nlc|rlc/i.test(fl)) return "past-test";
      return "resource";
    }
  
    function labelFromFile(filename) {
      return filename
        .replace(/\.(pdf|docx?)$/i, "")
        .replace(/[_]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }
  
    /* Build the map */
    const map = {};
    EVENTS.forEach(event => {
      const docs = [];
  
      /* Objective test PDF */
      if (objTestMap[event]) {
        docs.push({
          label: "Sample Questions PDF",
          path: `fblaresources/objective tests/${objTestMap[event]}`,
          category: "sample-test"
        });
      }
  
      /* Production test PDF */
      if (prodTestMap[event]) {
        docs.push({
          label: "Sample Production Test",
          path: `fblaresources/production test/${prodTestMap[event]}`,
          category: "production"
        });
      }
  
      /* Roleplay sample DOCX files */
      const rpSpec = roleplaySampleMap[event];
      if (rpSpec) {
        rpSpec.nums.forEach(n => {
          docs.push({
            label: `Roleplay Sample ${n}`,
            path: `fblaresources/sample roleplays/${rpSpec.prefix}${n}${rpSpec.ext}`,
            category: "roleplay"
          });
        });
      }
  
      /* FBLA Time archive files */
      const folder = fblaTimeFolderMap[event];
      if (folder && fblaTimeFiles[folder]) {
        fblaTimeFiles[folder].forEach(filename => {
          docs.push({
            label: labelFromFile(filename),
            path: `FBLA Time/FBLA Time/${folder}/${filename}`,
            category: classifyFile(filename)
          });
        });
      }
  
      /* Full FBLA Mega Folder supplemental files */
      if (folder && megaFolderFiles[folder]) {
        megaFolderFiles[folder].forEach(filename => {
          const basename = filename.split("/").pop();
          docs.push({
            label: labelFromFile(basename),
            path: `Full FBLA Mega Folder/${folder}/${filename}`,
            category: classifyFile(basename)
          });
        });
      }
  
      map[event] = docs;
    });
  
    /* Special mappings for events whose FBLA Time folder doesn't match via the main map */
    /* Customer Service → Client Service folder */
    if (fblaTimeFiles["Client Service"]) {
      const existing = map["Customer Service"] || [];
      fblaTimeFiles["Client Service"].forEach(filename => {
        existing.push({
          label: labelFromFile(filename),
          path: `FBLA Time/FBLA Time/Client Service/${filename}`,
          category: classifyFile(filename)
        });
      });
      map["Customer Service"] = existing;
    }
  
    /* Customer Service → Client Service folder (Full FBLA Mega Folder) */
    if (megaFolderFiles["Client Service"]) {
      const existing = map["Customer Service"] || [];
      megaFolderFiles["Client Service"].forEach(filename => {
        existing.push({
          label: labelFromFile(filename),
          path: `Full FBLA Mega Folder/Client Service/${filename}`,
          category: classifyFile(filename)
        });
      });
      map["Customer Service"] = existing;
    }
  
    /* Legacy folder cross-references — retired folder names linked to the closest modern event */
    const legacyFolderLinks = {
      "Business Management": ["Management Decision Making"],
      "Computer Applications": ["Database Design _ Applications", "Spreadsheet Applications", "Word Processing"],
      "Graphic Design": ["Publication Design"],
      "Personal Finance": ["Business Calculations"]
    };
    Object.entries(legacyFolderLinks).forEach(([event, folders]) => {
      const existing = map[event] || [];
      folders.forEach(legacyFolder => {
        [fblaTimeFiles, megaFolderFiles].forEach(source => {
          if (!source[legacyFolder]) return;
          const basePath = source === fblaTimeFiles
            ? `FBLA Time/FBLA Time/${legacyFolder}`
            : `Full FBLA Mega Folder/${legacyFolder}`;
          source[legacyFolder].forEach(filename => {
            const basename = filename.split("/").pop();
            existing.push({
              label: labelFromFile(basename),
              path: `${basePath}/${filename}`,
              category: classifyFile(basename)
            });
          });
        });
      });
      map[event] = existing;
    });
  
    /* Attach NAP guide to parliamentary events only */
    parliEvents.forEach(pe => {
      if (map[pe]) map[pe].push(napResource);
    });
  
    return map;
  })();
  
  /* ─── General (FBLA-wide) Resources ─── */
  const GENERAL_RESOURCES = [
    { label: "Competitive Events Study Guide 2007", path: "Full FBLA Mega Folder/fbla_competitive_events_study_guide_102007.pdf", category: "general" },
    { label: "Competitive Events Study Guide 2010-13", path: "Full FBLA Mega Folder/FBLA_Competitive_Events_Study_Guide__2010-2013_.pdf", category: "general" },
    { label: "Competitive Events Study Guide 2013-16", path: "Full FBLA Mega Folder/2013-2016 Studyguide.pdf", category: "general" },
    { label: "Competitive Events Guide 2015-16", path: "Full FBLA Mega Folder/FBLA Competitive Events 2015-16.pdf", category: "general" },
    { label: "CE Guide 2017-2020", path: "Full FBLA Mega Folder/CE Guide 2017-2020.pdf", category: "general" },
    { label: "Format Guide — Competitive Events", path: "Full FBLA Mega Folder/Format-Guide-Competitive-Events.pdf", category: "format-guide" }
  ];
  
  const PRESENTATION_GUIDE = { label: "Competitive Event Focus Meeting (Presentations)", path: "Full FBLA Mega Folder/Competitive Event Focus Meeting (Presentation Event).pdf", category: "format-guide" };
  
  

  window.MANUAL_QUIZ_DATA = {
    MANUAL_ANSWER_OVERRIDES,
    MANUAL_EVENT_DECKS,
    MANUAL_QUESTION_OVERRIDES,
    EVENT_FILE_RESOURCES,
    GENERAL_RESOURCES,
    PRESENTATION_GUIDE
  };
})(window);
