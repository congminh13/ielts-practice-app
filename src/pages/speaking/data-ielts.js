const data = {
  content: {
    total: 81,
    list: [
      {
        oralTopicId: 1,
        oralTopicName: "Doing Something Well",
        questionList: [
          { oralQuestionId: "1.1.1", oralPart: 1, oralQuestion: "What activities do you enjoy doing?" },
          { oralQuestionId: "1.1.2", oralPart: 1, oralQuestion: "Is there anything you do not do well?" },
          { oralQuestionId: "1.1.3", oralPart: 1, oralQuestion: "What's something you've become better at?" },
          { oralQuestionId: "1.1.4", oralPart: 1, oralQuestion: "How do you practice to improve skills?" },
          {
            oralQuestionId: "1.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe something you do well. You should say: what it is, how you learned to do it, how often you do it, and explain why you think you do it well.",
          },
          {
            oralQuestionId: "1.3.1",
            oralPart: 3,
            oralQuestion: "Why do you think some people are talented at certain skills?",
          },
          {
            oralQuestionId: "1.3.2",
            oralPart: 3,
            oralQuestion: "Is it important for parents to teach their children skills?",
          },
          {
            oralQuestionId: "1.3.3",
            oralPart: 3,
            oralQuestion: "Do you think natural talent or practice is more important?",
          },
        ],
      },
      {
        oralTopicId: 2,
        oralTopicName: "Rules",
        questionList: [
          { oralQuestionId: "2.1.1", oralPart: 1, oralQuestion: "Do you like rules? Why or why not?" },
          { oralQuestionId: "2.1.2", oralPart: 1, oralQuestion: "What rules do you follow at home?" },
          { oralQuestionId: "2.1.3", oralPart: 1, oralQuestion: "Are there rules in your workplace or school?" },
          { oralQuestionId: "2.1.4", oralPart: 1, oralQuestion: "What happens when people break rules?" },
          {
            oralQuestionId: "2.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe an important rule that is in your workplace or school. You should say: what the rule is, why it exists, what happens if someone breaks it, and explain how you feel about this rule.",
          },
          { oralQuestionId: "2.3.1", oralPart: 3, oralQuestion: "Why do you think rules are necessary in society?" },
          { oralQuestionId: "2.3.2", oralPart: 3, oralQuestion: "Do you think all rules are fair?" },
          { oralQuestionId: "2.3.3", oralPart: 3, oralQuestion: "What would happen if there were no rules?" },
        ],
      },
      {
        oralTopicId: 3,
        oralTopicName: "Public Places",
        questionList: [
          { oralQuestionId: "3.1.1", oralPart: 1, oralQuestion: "What public places do you often visit?" },
          { oralQuestionId: "3.1.2", oralPart: 1, oralQuestion: "Do you prefer crowded or quiet public places?" },
          { oralQuestionId: "3.1.3", oralPart: 1, oralQuestion: "What makes a good public place?" },
          { oralQuestionId: "3.1.4", oralPart: 1, oralQuestion: "How have public places changed recently?" },
          {
            oralQuestionId: "3.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe your favorite public place. You should say: where it is, what it looks like, what people do there, and explain why it's your favorite.",
          },
          { oralQuestionId: "3.3.1", oralPart: 3, oralQuestion: "Why are public places important in a city?" },
          { oralQuestionId: "3.3.2", oralPart: 3, oralQuestion: "How should governments maintain public spaces?" },
          {
            oralQuestionId: "3.3.3",
            oralPart: 3,
            oralQuestion: "Do you think technology will change public places in the future?",
          },
        ],
      },
      {
        oralTopicId: 4,
        oralTopicName: "Praise and Encouragement",
        questionList: [
          { oralQuestionId: "4.1.1", oralPart: 1, oralQuestion: "Do you like receiving praise?" },
          { oralQuestionId: "4.1.2", oralPart: 1, oralQuestion: "When was the last time someone praised you?" },
          { oralQuestionId: "4.1.3", oralPart: 1, oralQuestion: "Do you praise others often?" },
          { oralQuestionId: "4.1.4", oralPart: 1, oralQuestion: "Is praise important in your culture?" },
          {
            oralQuestionId: "4.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a time when someone praised you. You should say: who praised you, what they praised you for, how you felt, and explain why their praise was important.",
          },
          { oralQuestionId: "4.3.1", oralPart: 3, oralQuestion: "How does praise affect people's motivation?" },
          { oralQuestionId: "4.3.2", oralPart: 3, oralQuestion: "Is too much praise bad for children?" },
          {
            oralQuestionId: "4.3.3",
            oralPart: 3,
            oralQuestion: "Should praise be given equally or only to high achievers?",
          },
        ],
      },
      {
        oralTopicId: 5,
        oralTopicName: "Being Busy",
        questionList: [
          { oralQuestionId: "5.1.1", oralPart: 1, oralQuestion: "Are you a busy person? Why?" },
          { oralQuestionId: "5.1.2", oralPart: 1, oralQuestion: "What makes your life busy?" },
          { oralQuestionId: "5.1.3", oralPart: 1, oralQuestion: "Do you like being busy?" },
          { oralQuestionId: "5.1.4", oralPart: 1, oralQuestion: "How do you manage your time?" },
          {
            oralQuestionId: "5.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a time when you were very busy. You should say: when this happened, what you were doing, why you were busy, and explain how you felt about being busy.",
          },
          { oralQuestionId: "5.3.1", oralPart: 3, oralQuestion: "Is modern life becoming busier? Why?" },
          { oralQuestionId: "5.3.2", oralPart: 3, oralQuestion: "Is being busy always negative?" },
          { oralQuestionId: "5.3.3", oralPart: 3, oralQuestion: "How can people reduce stress from being busy?" },
        ],
      },
      {
        oralTopicId: 6,
        oralTopicName: "Weather",
        questionList: [
          { oralQuestionId: "6.1.1", oralPart: 1, oralQuestion: "What's the weather like today?" },
          { oralQuestionId: "6.1.2", oralPart: 1, oralQuestion: "What's your favorite type of weather?" },
          { oralQuestionId: "6.1.3", oralPart: 1, oralQuestion: "How does weather affect your mood?" },
          { oralQuestionId: "6.1.4", oralPart: 1, oralQuestion: "What activities do you do in different seasons?" },
          {
            oralQuestionId: "6.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a day when the weather was good. You should say: when it was, what you did, who you were with, and explain why you enjoyed it.",
          },
          { oralQuestionId: "6.3.1", oralPart: 3, oralQuestion: "How is climate change affecting weather patterns?" },
          {
            oralQuestionId: "6.3.2",
            oralPart: 3,
            oralQuestion: "Should people move away from areas with extreme weather?",
          },
          { oralQuestionId: "6.3.3", oralPart: 3, oralQuestion: "What's the best climate for living?" },
        ],
      },
      {
        oralTopicId: 7,
        oralTopicName: "Writing",
        questionList: [
          { oralQuestionId: "7.1.1", oralPart: 1, oralQuestion: "Do you write often?" },
          { oralQuestionId: "7.1.2", oralPart: 1, oralQuestion: "What do you usually write?" },
          { oralQuestionId: "7.1.3", oralPart: 1, oralQuestion: "Who do you write for?" },
          { oralQuestionId: "7.1.4", oralPart: 1, oralQuestion: "Is handwriting or typing better?" },
          {
            oralQuestionId: "7.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe something you wrote that was important to you. You should say: what you wrote, what it was about, why you wrote it, and explain how you felt when writing it.",
          },
          { oralQuestionId: "7.3.1", oralPart: 3, oralQuestion: "How has technology changed writing?" },
          { oralQuestionId: "7.3.2", oralPart: 3, oralQuestion: "Is handwriting still important to teach in schools?" },
          { oralQuestionId: "7.3.3", oralPart: 3, oralQuestion: "What's the importance of good writing skills?" },
        ],
      },
      {
        oralTopicId: 8,
        oralTopicName: "Names",
        questionList: [
          { oralQuestionId: "8.1.1", oralPart: 1, oralQuestion: "What's your name? Is there a story behind it?" },
          { oralQuestionId: "8.1.2", oralPart: 1, oralQuestion: "Do you like your name?" },
          { oralQuestionId: "8.1.3", oralPart: 1, oralQuestion: "Are naming traditions important in your culture?" },
          { oralQuestionId: "8.1.4", oralPart: 1, oralQuestion: "Would you change your name if you could?" },
          {
            oralQuestionId: "8.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a person's name that you find interesting. You should say: whose name it is, what it means, how you know them, and explain why you find it interesting.",
          },
          { oralQuestionId: "8.3.1", oralPart: 3, oralQuestion: "How do naming practices differ across cultures?" },
          {
            oralQuestionId: "8.3.2",
            oralPart: 3,
            oralQuestion: "Should parents have freedom to name their children anything?",
          },
          { oralQuestionId: "8.3.3", oralPart: 3, oralQuestion: "Do names influence a person's identity?" },
        ],
      },
      {
        oralTopicId: 9,
        oralTopicName: "Home and Accommodation",
        questionList: [
          { oralQuestionId: "9.1.1", oralPart: 1, oralQuestion: "Tell me about your home" },
          { oralQuestionId: "9.1.2", oralPart: 1, oralQuestion: "How long have you lived there?" },
          { oralQuestionId: "9.1.3", oralPart: 1, oralQuestion: "What do you like most about your home?" },
          { oralQuestionId: "9.1.4", oralPart: 1, oralQuestion: "Would you like to move to a different place?" },
          {
            oralQuestionId: "9.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe your ideal home or accommodation. You should say: what type of place it would be, where it would be located, how you would furnish it, and explain why it would be ideal for you.",
          },
          { oralQuestionId: "9.3.1", oralPart: 3, oralQuestion: "How are housing needs changing in modern society?" },
          {
            oralQuestionId: "9.3.2",
            oralPart: 3,
            oralQuestion: "What's the biggest challenge in finding suitable accommodation?",
          },
          { oralQuestionId: "9.3.3", oralPart: 3, oralQuestion: "Should governments provide housing for everyone?" },
        ],
      },
      {
        oralTopicId: 10,
        oralTopicName: "Sports",
        questionList: [
          { oralQuestionId: "10.1.1", oralPart: 1, oralQuestion: "Do you play any sports?" },
          { oralQuestionId: "10.1.2", oralPart: 1, oralQuestion: "What sports are popular in your country?" },
          { oralQuestionId: "10.1.3", oralPart: 1, oralQuestion: "Do you watch sports?" },
          { oralQuestionId: "10.1.4", oralPart: 1, oralQuestion: "Is physical fitness important to you?" },
          {
            oralQuestionId: "10.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe your favorite sport or exercise. You should say: what it is, how often you do it, how you learned to do it, and explain why you enjoy it.",
          },
          { oralQuestionId: "10.3.1", oralPart: 3, oralQuestion: "Why is sports important for society?" },
          { oralQuestionId: "10.3.2", oralPart: 3, oralQuestion: "Should dangerous sports be banned?" },
          { oralQuestionId: "10.3.3", oralPart: 3, oralQuestion: "How can people be encouraged to do more exercise?" },
        ],
      },
      {
        oralTopicId: 11,
        oralTopicName: "Technology",
        questionList: [
          { oralQuestionId: "11.1.1", oralPart: 1, oralQuestion: "How often do you use technology?" },
          { oralQuestionId: "11.1.2", oralPart: 1, oralQuestion: "What technologies do you use daily?" },
          { oralQuestionId: "11.1.3", oralPart: 1, oralQuestion: "How has technology changed your life?" },
          { oralQuestionId: "11.1.4", oralPart: 1, oralQuestion: "Do you think too much technology is bad?" },
          {
            oralQuestionId: "11.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a piece of technology that you find useful. You should say: what it is, what you use it for, how long you've used it, and explain why you find it useful.",
          },
          { oralQuestionId: "11.3.1", oralPart: 3, oralQuestion: "How will technology change in the future?" },
          {
            oralQuestionId: "11.3.2",
            oralPart: 3,
            oralQuestion: "Are there negative effects of technology on society?",
          },
          { oralQuestionId: "11.3.3", oralPart: 3, oralQuestion: "Should technology use be limited?" },
        ],
      },
      {
        oralTopicId: 12,
        oralTopicName: "Food and Cooking",
        questionList: [
          { oralQuestionId: "12.1.1", oralPart: 1, oralQuestion: "Do you enjoy cooking?" },
          { oralQuestionId: "12.1.2", oralPart: 1, oralQuestion: "What's your favorite food?" },
          { oralQuestionId: "12.1.3", oralPart: 1, oralQuestion: "Do you prefer home-cooked or restaurant food?" },
          { oralQuestionId: "12.1.4", oralPart: 1, oralQuestion: "Is food important to your culture?" },
          {
            oralQuestionId: "12.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a meal or dish that is special to you. You should say: what it is, when you usually eat it, who prepares it, and explain why it's special to you.",
          },
          { oralQuestionId: "12.3.1", oralPart: 3, oralQuestion: "How have eating habits changed over time?" },
          { oralQuestionId: "12.3.2", oralPart: 3, oralQuestion: "Is food more important for nutrition or enjoyment?" },
          {
            oralQuestionId: "12.3.3",
            oralPart: 3,
            oralQuestion: "What challenges does the world face with food production?",
          },
        ],
      },
      {
        oralTopicId: 13,
        oralTopicName: "Travel and Tourism",
        questionList: [
          { oralQuestionId: "13.1.1", oralPart: 1, oralQuestion: "Do you enjoy traveling?" },
          { oralQuestionId: "13.1.2", oralPart: 1, oralQuestion: "Where have you traveled?" },
          { oralQuestionId: "13.1.3", oralPart: 1, oralQuestion: "What's the best way to travel?" },
          { oralQuestionId: "13.1.4", oralPart: 1, oralQuestion: "Would you like to travel more?" },
          {
            oralQuestionId: "13.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a place you traveled to. You should say: where it was, when you went, what you did there, and explain why you enjoyed it.",
          },
          { oralQuestionId: "13.3.1", oralPart: 3, oralQuestion: "How has tourism affected local communities?" },
          { oralQuestionId: "13.3.2", oralPart: 3, oralQuestion: "What's the impact of tourism on the environment?" },
          { oralQuestionId: "13.3.3", oralPart: 3, oralQuestion: "Should tourism be limited in fragile environments?" },
        ],
      },
      {
        oralTopicId: 14,
        oralTopicName: "Books and Reading",
        questionList: [
          { oralQuestionId: "14.1.1", oralPart: 1, oralQuestion: "Do you enjoy reading?" },
          { oralQuestionId: "14.1.2", oralPart: 1, oralQuestion: "What type of books do you prefer?" },
          { oralQuestionId: "14.1.3", oralPart: 1, oralQuestion: "How often do you read?" },
          { oralQuestionId: "14.1.4", oralPart: 1, oralQuestion: "Do you prefer physical books or e-books?" },
          {
            oralQuestionId: "14.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a book that impressed you. You should say: what it was about, when you read it, why it impressed you, and explain how it affected you.",
          },
          { oralQuestionId: "14.3.1", oralPart: 3, oralQuestion: "Is reading becoming less popular?" },
          { oralQuestionId: "14.3.2", oralPart: 3, oralQuestion: "How do books benefit society?" },
          { oralQuestionId: "14.3.3", oralPart: 3, oralQuestion: "Should reading be promoted more in schools?" },
        ],
      },
      {
        oralTopicId: 15,
        oralTopicName: "Family",
        questionList: [
          { oralQuestionId: "15.1.1", oralPart: 1, oralQuestion: "Tell me about your family" },
          { oralQuestionId: "15.1.2", oralPart: 1, oralQuestion: "How much time do you spend with your family?" },
          { oralQuestionId: "15.1.3", oralPart: 1, oralQuestion: "What do you enjoy doing together?" },
          { oralQuestionId: "15.1.4", oralPart: 1, oralQuestion: "How important is family to you?" },
          {
            oralQuestionId: "15.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a family member you admire. You should say: who they are, what they do, why you admire them, and explain what you've learned from them.",
          },
          { oralQuestionId: "15.3.1", oralPart: 3, oralQuestion: "How have family structures changed?" },
          {
            oralQuestionId: "15.3.2",
            oralPart: 3,
            oralQuestion: "What role should grandparents have in raising children?",
          },
          { oralQuestionId: "15.3.3", oralPart: 3, oralQuestion: "Is it important to maintain close family ties?" },
        ],
      },
      {
        oralTopicId: 16,
        oralTopicName: "Friendship",
        questionList: [
          { oralQuestionId: "16.1.1", oralPart: 1, oralQuestion: "What makes a good friend?" },
          { oralQuestionId: "16.1.2", oralPart: 1, oralQuestion: "How many close friends do you have?" },
          { oralQuestionId: "16.1.3", oralPart: 1, oralQuestion: "How do you maintain friendships?" },
          { oralQuestionId: "16.1.4", oralPart: 1, oralQuestion: "Has technology changed friendship?" },
          {
            oralQuestionId: "16.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a friend you really value. You should say: who they are, how long you've known them, what you do together, and explain why they're important to you.",
          },
          { oralQuestionId: "16.3.1", oralPart: 3, oralQuestion: "How important is friendship in life?" },
          {
            oralQuestionId: "16.3.2",
            oralPart: 3,
            oralQuestion: "Can online friendships be as meaningful as face-to-face ones?",
          },
          { oralQuestionId: "16.3.3", oralPart: 3, oralQuestion: "What challenges do friendships face today?" },
        ],
      },
      {
        oralTopicId: 17,
        oralTopicName: "Education",
        questionList: [
          { oralQuestionId: "17.1.1", oralPart: 1, oralQuestion: "Tell me about your education" },
          { oralQuestionId: "17.1.2", oralPart: 1, oralQuestion: "What did you enjoy most about school?" },
          { oralQuestionId: "17.1.3", oralPart: 1, oralQuestion: "What would you change about education?" },
          { oralQuestionId: "17.1.4", oralPart: 1, oralQuestion: "Is education changing?" },
          {
            oralQuestionId: "17.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a teacher who had a positive influence on you. You should say: who they were, what subject they taught, how they influenced you, and explain why they were important.",
          },
          { oralQuestionId: "17.3.1", oralPart: 3, oralQuestion: "What's the purpose of education?" },
          { oralQuestionId: "17.3.2", oralPart: 3, oralQuestion: "Should education be more practical or theoretical?" },
          { oralQuestionId: "17.3.3", oralPart: 3, oralQuestion: "How will education change in the future?" },
        ],
      },
      {
        oralTopicId: 18,
        oralTopicName: "Work and Career",
        questionList: [
          { oralQuestionId: "18.1.1", oralPart: 1, oralQuestion: "Tell me about your work or studies" },
          { oralQuestionId: "18.1.2", oralPart: 1, oralQuestion: "What career would you like to pursue?" },
          { oralQuestionId: "18.1.3", oralPart: 1, oralQuestion: "Is work important to you?" },
          { oralQuestionId: "18.1.4", oralPart: 1, oralQuestion: "What makes a good job?" },
          {
            oralQuestionId: "18.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a job you would like to do. You should say: what the job is, what it involves, why you'd like to do it, and explain how you'd prepare for it.",
          },
          { oralQuestionId: "18.3.1", oralPart: 3, oralQuestion: "How is the job market changing?" },
          { oralQuestionId: "18.3.2", oralPart: 3, oralQuestion: "Should people stay in one job or change careers?" },
          { oralQuestionId: "18.3.3", oralPart: 3, oralQuestion: "What makes a successful career?" },
        ],
      },
      {
        oralTopicId: 19,
        oralTopicName: "Hobbies",
        questionList: [
          { oralQuestionId: "19.1.1", oralPart: 1, oralQuestion: "Do you have any hobbies?" },
          { oralQuestionId: "19.1.2", oralPart: 1, oralQuestion: "How did you develop your hobbies?" },
          { oralQuestionId: "19.1.3", oralPart: 1, oralQuestion: "How much time do you spend on hobbies?" },
          { oralQuestionId: "19.1.4", oralPart: 1, oralQuestion: "Why are hobbies important?" },
          {
            oralQuestionId: "19.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a hobby or interest that's important to you. You should say: what it is, how long you've had this hobby, what you do, and explain why it's important to you.",
          },
          { oralQuestionId: "19.3.1", oralPart: 3, oralQuestion: "How have hobbies changed over time?" },
          { oralQuestionId: "19.3.2", oralPart: 3, oralQuestion: "Should people pursue hobbies as careers?" },
          { oralQuestionId: "19.3.3", oralPart: 3, oralQuestion: "What's the value of having hobbies?" },
        ],
      },
      {
        oralTopicId: 20,
        oralTopicName: "Useful Books",
        questionList: [
          { oralQuestionId: "20.1.1", oralPart: 1, oralQuestion: "Do you find reading useful?" },
          { oralQuestionId: "20.1.2", oralPart: 1, oralQuestion: "What types of books are most useful?" },
          { oralQuestionId: "20.1.3", oralPart: 1, oralQuestion: "Do you prefer fiction or non-fiction?" },
          { oralQuestionId: "20.1.4", oralPart: 1, oralQuestion: "How can books help people?" },
          {
            oralQuestionId: "20.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a book you found useful. You should say: what it was about, how you found out about it, what you learned from it, and explain why it was useful.",
          },
          { oralQuestionId: "20.3.1", oralPart: 3, oralQuestion: "How do books help with personal development?" },
          { oralQuestionId: "20.3.2", oralPart: 3, oralQuestion: "Should books be available for free?" },
          { oralQuestionId: "20.3.3", oralPart: 3, oralQuestion: "Will books become obsolete in the future?" },
        ],
      },
      {
        oralTopicId: 21,
        oralTopicName: "Music",
        questionList: [
          { oralQuestionId: "21.1.1", oralPart: 1, oralQuestion: "Do you enjoy music?" },
          { oralQuestionId: "21.1.2", oralPart: 1, oralQuestion: "What type of music do you like?" },
          { oralQuestionId: "21.1.3", oralPart: 1, oralQuestion: "Can you play any instruments?" },
          { oralQuestionId: "21.1.4", oralPart: 1, oralQuestion: "Is music important to your culture?" },
          {
            oralQuestionId: "21.2.1",
            oralPart: 2,
            oralQuestion:
              "Describe a piece of music or artist you like. You should say: what it is or who they are, when you first heard them, what the music is about, and explain why you enjoy it.",
          },
          { oralQuestionId: "21.3.1", oralPart: 3, oralQuestion: "How has music changed over time?" },
          { oralQuestionId: "21.3.2", oralPart: 3, oralQuestion: "What's the impact of music on society?" },
          { oralQuestionId: "21.3.3", oralPart: 3, oralQuestion: "Should music education be mandatory in schools?" },
        ],
      },
    ],
  },
}

export default data
