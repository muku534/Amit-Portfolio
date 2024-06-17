"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import School from '@mui/icons-material/SchoolTwoTone';
import Education from '@mui/icons-material/CastForEducationTwoTone';
import WorkIcon from '@mui/icons-material/WorkHistoryTwoTone';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';


export default function About() {
    const education = [
        {
            id: 1,
            title: 'Ph.D. in Computer Science',
            institution: 'University of Example',
            year: '2020 - Present',
            description: 'Currently pursuing Ph.D. in Computer Science with a focus on Machine Learning.',
        },
        {
            id: 2,
            title: 'Master of Science in Software Engineering',
            institution: 'Tech University',
            year: '2016 - 2019',
            description: 'Graduated with a Master\'s degree in Software Engineering, specializing in Web Development.',
        },
        {
            id: 3,
            title: 'Bachelor of Technology in Computer Science',
            institution: 'College of Engineering',
            year: '2012 - 2016',
            description: 'Completed Bachelor\'s degree in Computer Science, with coursework in Algorithms and Data Structures.',
        },
        {
            id: 4,
            title: 'Google Educator Level-1 Certification',
            institution: 'Google',
            year: '2019',
            description: 'Certified as a Google Educator Level-1, proficient in using Google tools for education.',
        },
        {
            id: 5,
            title: 'Google Workspace Administrator',
            institution: 'Google',
            year: '2021',
            description: 'Certified as a Google Workspace Administrator, managing organizational Google Workspace setups.',
        },
    ];

    const experience = [
        {
            id: 1,
            title: 'Assistant Professor',
            institution: 'University of Example',
            year: '2018 - Present',
            description: 'Teaching undergraduate courses in Computer Science, conducting research in AI and Machine Learning.',
        },
        {
            id: 2,
            title: 'Software Engineer Intern',
            institution: 'Tech Company',
            year: 'Summer 2017',
            description: 'Internship experience focused on full-stack web development using React and Node.js.',
        },
        {
            id: 3,
            title: 'Freelance Web Developer',
            institution: 'Self-employed',
            year: '2015 - 2017',
            description: 'Developed and maintained websites for small businesses and startups using HTML, CSS, and JavaScript.',
        },
        {
            id: 4,
            title: 'Freelance Web Developer',
            institution: 'Self-employed',
            year: '2015 - 2017',
            description: 'Developed and maintained websites for small businesses and startups using HTML, CSS, and JavaScript.',
        },
        {
            id: 5,
            title: 'Freelance Web Developer',
            institution: 'Self-employed',
            year: '2015 - 2017',
            description: 'Developed and maintained websites for small businesses and startups using HTML, CSS, and JavaScript.',
        },
    ];

    return (
        <div id="About">
            <section className="flex lg:flex-row flex-col w-full pt-14 bg-gray-50 lg:mb-20 mb-10 lg:pb-10">
                <div className="w-full lg:w-1/2 lg:px-14 px-5 justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4 lg:pb-0 pb-10">Education</h1>
                    <Timeline position="alternate">
                        {education.map((item) => (
                            <TimelineItem key={item.id}>
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.year}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <WorkIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Typography variant="h6" component="span">
                                            {item.title}
                                        </Typography>
                                        <Typography>{item.institution}</Typography>
                                        <Typography variant="body2">{item.description}</Typography>
                                    </motion.div>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </div>

                <div className="w-full lg:w-1/2 lg:px-14 px-5 lg:pt-0 pt-10 justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4 lg:pb-0 pb-10">Experience</h1>
                    <Timeline position="alternate">
                        {experience.map((item) => (
                            <TimelineItem key={item.id}>
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.year}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <WorkIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Typography variant="h6" component="span">
                                            {item.title}
                                        </Typography>
                                        <Typography>{item.institution}</Typography>
                                        <Typography variant="body2">{item.description}</Typography>
                                    </motion.div>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </div>
            </section>
        </div>
    )
}
