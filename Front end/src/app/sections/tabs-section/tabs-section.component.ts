import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tabs-section",
  templateUrl: "./tabs-section.component.html",
  styleUrls: ["./tabs-section.component.css"],
})
export class TabsSectionComponent implements OnInit {
  // FAQs for YouTube tab
  faqs = [
    {
      question: "Is it legal to use this YouTube downloader?",
      answer:
        "Yes, our YouTube downloader complies with YouTube's terms of service. Make sure to use it responsibly and respect copyright laws.",
      showAnswer: false,
    },
    {
      question: "Can I download videos for offline viewing?",
      answer:
        "Unfortunately, our downloader doesn't support offline viewing. However, you can use YouTube's official offline feature on mobile devices.",
      showAnswer: false,
    },
    {
      question: "How do I troubleshoot if the downloader is not working?",
      answer:
        "Check your internet connection, ensure you have the latest version of the downloader, and refer to our troubleshooting guide for detailed assistance.",
      showAnswer: false,
    },
    // Add more FAQs as needed
  ];

  // FAQs for Facebook tab
  facebookFaqs = [
    {
      question: "Is the video downloader free to use?",
      answer:
        "Yes, our video downloader is free to use. We provide this service as a convenience, but please be aware of and comply with Facebook's terms of service.",
      showAnswer: false,
    },
    {
      question: "Can I download private videos from Facebook?",
      answer:
        "No, our tool does not support downloading videos that are set as private on Facebook. Respect the privacy settings of users and only download videos that are meant for public viewing.",
      showAnswer: false,
    },
    {
      question: "How do I download a Facebook video using your tool?",
      answer:
        "Simply paste the URL of the Facebook video into the provided field on our website/application, and click the download button. Follow the on-screen instructions to save the video to your device.",
      showAnswer: false,
    },
    // Add more Facebook FAQs as needed
  ];

  // FAQs for Instagram tab
  instagramFaqs = [
    {
      question: "Is it safe to use your Instagram video downloader?",
      answer:
        "Yes, our tool is designed with user safety in mind. We prioritize data security and privacy throughout the downloading process.",
      showAnswer: false,
    },
    {
      question: "Can I download Instagram videos on my mobile device?",
      answer:
        "Absolutely! Our Instagram video downloader is mobile-friendly, allowing you to easily save videos directly to your phone or tablet.",
      showAnswer: false,
    },
    {
      question:
        "Are there any restrictions on the length of videos I can download?",
      answer:
        "Generally, our tool supports downloading videos of varying lengths. Check our website for specific details on any duration limitations.",
      showAnswer: false,
    },
    // Add more instagram FAQs as needed
  ];
  // FAQs for tiktok tab
  tiktokFaqs = [
    {
      question:
        "Can I download TikTok videos without violating any terms of service?",
      answer:
        " Yes, our TikTok video downloader adheres to TikTok's terms of service. Ensure you have the right to download and share content in compliance with TikTok's guidelines.",
      showAnswer: false,
    },
    {
      question:
        "Is it possible to download TikTok videos with watermarks removed?",
      answer:
        "Our tool respects the intellectual property of creators, and downloaded videos may retain watermarks to give credit to the original content creators.",
      showAnswer: false,
    },
    {
      question:
        "Are there any restrictions on downloading TikTok videos for personal use?",
      answer:
        "You can typically download TikTok videos for personal use. However, be mindful of copyright laws and avoid redistributing or repurposing content without permission.",
      showAnswer: false,
    },
    // Add more tiktok FAQs as needed
  ];

  constructor() {}

  ngOnInit() {}

  toggleAnswer(faq) {
    faq.showAnswer = !faq.showAnswer;
  }

  toggleFacebookAnswer(faq) {
    faq.showAnswer = !faq.showAnswer;
  }

  toggleinstagramAnswer(faq) {
    faq.showAnswer = !faq.showAnswer;
  }

  toggletiktokAnswer(faq) {
    faq.showAnswer = !faq.showAnswer;
  }
}
