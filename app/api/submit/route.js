import { supabase } from '../../../lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { answers } = body;

        if (!answers) {
            return NextResponse.json(
                { error: 'Answers are required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('survey_responses')
            .insert([{ answers }])
            .select();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Survey submitted successfully', data },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
